input = {
    "section": {
        "material": "C30/37",
        "width": "200",
        "height": "300"
    },
    "points": [
        {
            "x": "0",
            "y": "0",
            "name": "p1",
            "codeNumbers": "0,1,2",
            "dof": "0,0,0"
        },
        {
            "x": "0",
            "y": "3",
            "name": "p2",
            "codeNumbers": "3,4,5",
            "dof": "1,1,1"
        },
        {
            "x": "3",
            "y": "3",
            "name": "p3",
            "codeNumbers": "6,7,8",
            "dof": "1,1,1"
        },
        {
            "x": "3",
            "y": "0",
            "name": "p4",
            "codeNumbers": "9,10,11",
            "dof": "0,0,1"
        }
    ],
    "bars": [
        {
            "startPoint": {
                "x": "0",
                "y": "0",
                "name": "p1",
                "codeNumbers": "0,1,2",
                "dof": "0,0,0"
            },
            "endPoint": {
                "x": "0",
                "y": "3",
                "name": "p2",
                "codeNumbers": "3,4,5",
                "dof": "1,1,1"
            },
            "name": "b1"
        },
        {
            "startPoint": {
                "x": "0",
                "y": "3",
                "name": "p2",
                "codeNumbers": "3,4,5",
                "dof": "1,1,1"
            },
            "endPoint": {
                "x": "3",
                "y": "3",
                "name": "p3",
                "codeNumbers": "6,7,8",
                "dof": "1,1,1"
            },
            "name": "b2"
        },
        {
            "startPoint": {
                "x": "3",
                "y": "3",
                "name": "p3",
                "codeNumbers": "6,7,8",
                "dof": "1,1,1"
            },
            "endPoint": {
                "x": "3",
                "y": "0",
                "name": "p4",
                "codeNumbers": "9,10,11",
                "dof": "0,0,1"
            },
            "name": "b3"
        }
    ],
    "loads": [
        {
            "bar": "b1",
            "F": "0",
            "F_position": "0",
            "Q": "5"
        },
        {
            "bar": "b2",
            "F": "40",
            "F_position": "0.5",
            "Q": "0"
        },
        {
            "bar": "b2",
            "F": "0",
            "F_position": "0",
            "Q": "0"
        }
    ]
}
