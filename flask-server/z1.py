from modules.internalForces import *
from modules.matrices import LoadMatrix, BarMatrices
from modules.model import Point, Bar, Load, BarProps
from modules.helpers import parseMatrixRows, parseMatrixColumns, parseMatrixIndexes
import numpy as np
import pandas as pd


def modelSolution(input):
    # helper functions to parse input

    def convertString(string):
        # convert '1,2,3' to [1,2,3]
        return [int(x) for x in string.split(",")]

    def getBarProps(input):
        # get section from input
        section = input["section"]
        # create BarProps object
        return BarProps(section["material"], {"width": int(section["width"]), "height": int(section["height"])})

    def getPoints(input):
        # get points from input
        points = input["points"]
        # create Point objects and return them in a list
        return [Point(int(point["x"]), int(point["y"]), point["name"], convertString(point["codeNumbers"]), convertString(point["dof"])) for point in points]

    def getBars(input):
        # get bars from input
        bars = input["bars"]
        # create Bar objects and return them in a list
        return [Bar(point1, point2, bar["name"]) for bar in bars for point1 in getPoints(input) for point2 in getPoints(input) if point1.name == bar["startPoint"]["name"] and point2.name == bar["endPoint"]["name"]]

    def getLoads(input):
        # get loads from input
        loads = input["loads"]
        # create Load objects and return them in a list
        return [Load(bar, float(load["Q"]), float(load["F"]), float(load["F_position"])) for load in loads for bar in getBars(input) if bar.name == load["bar"]]

    # get matrices on each bar and return dictionary

    def barSolution(bar, barProps, load):
        # bundle bar, barProps and load into a dictionary
        barDict = {"bars": bar, "loads": load}
        [bars, loads] = [barDict["bars"], barDict["loads"]]

        # get calculated things
        lx_list = []
        ly_list = []
        alfa_list = []
        A0_list = []
        B0_list = []
        k_list = []
        F_list = []
        FA_g_list = []
        FB_g_list = []

        for i in range(len(barDict['bars'])):
            # print bar geomertry
            [lx, ly] = bars[i].l_xy
            lx_list.append(lx)
            ly_list.append(ly)
            alfa = bars[i].angle
            alfa_list.append(alfa)
            # print('------------------------')
            # print(
            #     f"Bar {bars[i].name} geometry \nlx = {lx} m, ly = {ly} m, alfa = {alfa} deg")

            # print bar matrices
            bar_matrices = BarMatrices(barProps, bars[i])
            A0 = bar_matrices.rotation
            A0_list.append(A0)
            B0 = bar_matrices.transmission
            B0_list.append(B0)
            k = bar_matrices.gss_stiffness
            k = parseMatrixIndexes(k, bars[i].codeNumbers)
            k_list.append(k)
            # print(
            # f'stiffness matrix \n{k}\n rotation matrix \n{A0}\n transmission matrix \n{B0}')

            # calculate primary internal forces
            IntF = InternalForces_primary(loads[i], bars[i])
            # print(f'primary internal forces \n{IntF} ***********************')

            # print load vector
            FA_l = LoadMatrix.lss(0, IntF.Va, IntF.Ma)
            FB_l = LoadMatrix.lss(0, IntF.Vb, IntF.Mb)
            FA_g = LoadMatrix.gss(FA_l, A0.T)
            FA_g_list.append(FA_g)
            FB_g = LoadMatrix.gss(FB_l, A0.T)
            FB_g_list.append(FB_g)

            F = LoadMatrix.super(FA_g, FB_g)
            F = parseMatrixRows(F, bars[i].codeNumbers)
            F_list.append(F)
            # print(f'load vector \n{F}')

        toReturn = {
            "bar": bars,
            "barProps": barProps,
            "lx": lx_list,
            "ly": ly_list,
            "alfa": alfa_list,
            "A0": A0_list,
            "B0": B0_list,
            "k": k_list,
            "F": F_list,
            "FA_g": FA_g_list,
            "FB_g": FB_g_list,
        }
        return toReturn

    barSolution_ = barSolution(
        getBars(input), getBarProps(input), getLoads(input))

    def writeBarSolutionTXT(barSolution):
        # write bar solution to a txt file
        with open("barSolution.txt", "w") as f:
            for bar in barSolution:
                f.write(
                    f"Bar {bar['name']} geometry \nlx = {bar['lx']} m, ly = {bar['ly']} m, alfa = {bar['alfa']} deg\n")
                f.write(
                    f"stiffness matrix \n{bar['k']}\n rotation matrix \n{bar['A0']}\n transmission matrix \n{bar['B0']}\n")
                f.write(f"load vector \n{bar['F']}\n")

    def modelMatrix(barSolution):
        # create model matrix
        k = barSolution["k"]
        zeros = pd.DataFrame(np.zeros((12, 12)))
        layer1 = zeros.add(k[0], fill_value=0)
        layer2 = layer1.add(k[1], fill_value=0)
        layer3 = layer2.add(k[2], fill_value=0)
        # print("model matrix \n", layer3)
        return layer3

    modelMatrix_ = modelMatrix(barSolution(
        getBars(input), getBarProps(input), getLoads(input)))

    def loadVector(barSolution):
        # create load vector
        F = barSolution["F"]
        F1 = F[0]
        F2 = F1.add(F[1], fill_value=0)
        F3 = F2.add(F[2], fill_value=0)
        # print("load vector \n", F3)
        return F3

    def boundaryConditions(points, condition):
        # get boundary conditions
        bc = []
        for point in points:
            bc.append(point.dof)
        df = pd.DataFrame(np.array(bc).flatten())
        return df[df[0] == condition].index.values.astype(int)

    def filterMatrix(matrix, indexes):
        # filter matrix by indexes
        x = matrix.copy()
        x.drop(indexes, inplace=True)
        return x

    bc_1 = boundaryConditions(getPoints(input), 1)
    bc_0 = boundaryConditions(getPoints(input), 0)

    # load vector filtered by boundary conditions
    bc_LoadVector = filterMatrix(loadVector(
        barSolution_), bc_0)

    # model matrix filtered by boundary conditions
    bc_modelMatrix = filterMatrix(
        modelMatrix_, bc_0)[bc_1]

    def nodeDisplacements(modelMatrix, loadVector):
        # calculate node displacements
        inv = pd.DataFrame(np.linalg.inv(modelMatrix.values),
                           modelMatrix.columns, modelMatrix.index)
        return inv.dot(loadVector)*-1

    nodeDisplacements_ = nodeDisplacements(bc_modelMatrix, bc_LoadVector)

    def modelDisplacements(nodeDisplacements):
        return pd.DataFrame(np.zeros((12, 1))).add(nodeDisplacements, fill_value=0)

    modelDisplacements_ = modelDisplacements(nodeDisplacements_)

    def barInternalForces(modelDisplacements, barSolution):
        # calculate internal forces by formula --- F = F' + k * delta

        bars = barSolution["bar"]
        A0 = barSolution["A0"]
        k = barSolution["k"]
        FA_g = barSolution["FA_g"]
        FB_g = barSolution["FB_g"]

        forces_list = []
        for i in range(len(bars)):
            # get bar displacements (delta)
            delta_1 = modelDisplacements.loc[bars[i].codeNumbers[0]:bars[i].codeNumbers[2]]
            delta_2 = modelDisplacements.loc[bars[i].codeNumbers[3]:bars[i].codeNumbers[5]]
            deltaBar = pd.concat([delta_1, delta_2])

            # u = k * delta
            u = k[i].dot(deltaBar)

            # F' --- node A
            A0_A_parsed = parseMatrixIndexes(A0[i], bars[i].codeNumbers[0:3])
            F_A_g_parsed = parseMatrixRows(FA_g[i], bars[i].codeNumbers[0:3])

            # F' --- node B
            A0_B_parsed = parseMatrixIndexes(A0[i], bars[i].codeNumbers[3:6])
            F_B_g_parsed = parseMatrixRows(FB_g[i], bars[i].codeNumbers[3:6])

            # F' + u --- node A
            local = u.loc[bars[i].codeNumbers[0]:bars[i].codeNumbers[2]]+F_A_g_parsed
            F1 = A0_A_parsed.T.dot(local)
            forces_AB = parseMatrixRows(F1, ["N", "V", "M"])

            # F' + u --- node B
            local = u.loc[bars[i].codeNumbers[3]:bars[i].codeNumbers[5]]+F_B_g_parsed
            F2 = A0_B_parsed.dot(local)
            forces_BA = parseMatrixRows(F2, ["N", "V", "M"])

            forces = pd.concat([forces_AB, forces_BA], axis=1)
            parsedForces = parseMatrixColumns(
                forces, [bars[i].point_a.name+bars[i].name, bars[i].point_b.name+bars[i].name])
            forces_list.append(parsedForces)

        forces_final = pd.concat(forces_list, axis=1)
        # print("internal forces \n", forces_final)
        return forces_final

    barInternalForces_ = barInternalForces(modelDisplacements_, barSolution_)

    return {
        "modelMatrix": modelMatrix_.to_html(),
        "bc_modelMatrix": bc_modelMatrix.to_html(),
        "bc_LoadVector": bc_LoadVector.to_html(),
        "modelDisplacements": modelDisplacements_.to_html(),
        "barInternalForces": barInternalForces_.to_html()
    }
    # model matrix raw
    # model matrix filtered by boundary conditions
    # load vector raw
    # load vector filtered by boundary conditions
    # model displacements
    # internal forces
