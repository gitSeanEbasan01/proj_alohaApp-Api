Sample Task Data

{
  "user": "Sean",
  "title": "First Task",
  "description": "Testing out the database with this first task",
  "project": "ProjectSample",
  "section": "Tasks",
  "fields": [
      {
        "type": "Single-Select",
        "title": "Priority",
        "values": [
            "High"
          ]
      },
      {
        "type": "Single-Select",
        "title": "Status",
        "values": [
            "On Track"
          ]
      }
    ]
}






const taskSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            require: true
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            require: false
        },
        section: {
            type: String, //Do the choosing in the front-end where you're taking the current project you're on
            require: false
        },
        fields: {
            type: [], //The options of array values should be in an option format when you right click coming from the project's fields and not inside the not
            require: false
        }
    },
    {
        timestamps: true
    }
)



--Data for Fields
--Create a ProjectFieldForm later
-When creating a fieldName, make sure to check for duplicate before passing it.

{
  fieldTypes: [
    {
      "id": "0",
      "type": "Single-Select",
      "fieldName": "",
      "values": []
    },
    {
      "id": "1",
      "type": "Multiple-Select",
      "fieldName": "",
      "values": []
    },
    {
      "id": "2",
      "type": "Person",
      "fieldName": "",
      "values": []
    }
  ]
}

For Front-end
{
  "fieldType": Single-Select,
  "fieldName": "",
  "output": ""
}




{
    "_id": "6503b92e789f7119d7fe3db9",
    "user": "Sean",
    "title": "Second Task",
    "description": "More Testing..",
    "project": "6503eed96f8ef3fe8c9769c1",
    "section": "Tasks",
    "fields": [
      {
        "fieldType": "Multiple-Select",
        "fieldName": "Technologies",
        "output": [
          "MongoDB",
          "NodeJS"
        ]
      },
      {
        "fieldType": "Single-Select",
        "fieldName": "Priority",
        "output": "Medium"
      },
      {
        "fieldType": "Person",
        "fieldName": "Designers",
        "output": [
          "Sean",
          "Dave",
          "Samantha"
        ]
      }
    ],
    "__v": 0
  }