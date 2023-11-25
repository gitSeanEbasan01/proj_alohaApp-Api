const Project = require('../models/Project');
const Task = require('../models/Task');

const getAllProjects = async (req, res) => {

    const projects = await Project.find().lean();

    if (!projects?.length) {
        return res.status(400).json({ message: 'No Projects Found' });
    }

    return res.json(projects);
    
};


const createNewProject = async (req, res) => {

    const {
        tag,
        users,
        title,
        status,
        sections,
        fields
    } = req.body;

    if ( !users || !title || !status || !sections) {
        return res.status(400).json({ message: 'Fill Required Inputs!' });
    }
    
    const duplicate = await Project.findOne({ title }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Project Title Exists!' });
    }

    const project = await Project.create({ tag, users, title, status, sections, fields });

    if (project) {
        // console.log(project);
        return res.status(201).json({ message: 'New Project Created' });
    }else {
        return res.status(400).json({ message: 'Invalid Project Data Received' });
    }
    
};

// For any updates to the project that doesn't involve the tasks
const updateProject = async (req, res) => {

    const { id, title, status, sections, fields, type } = req.body

    // Confirm data
    if (!id || !title) {
        return res.status(400).json({ message: 'All fields are required' })
    }



    // Confirm note exists to update
    const project = await Project.findById(id).exec()

    if (!project) {
        return res.status(400).json({ message: 'Project not found' })
    }



    // Check for duplicate title
    const duplicate = await Project.findOne({ title }).lean().exec()

    // Allow renaming of the original title 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Project Title' })
    }

    if (title) {
        console.log("Title Updated");
        project.title = title
    } 
    if (status) {
        console.log("Status Updated");
        project.status = status
    }
    if (sections) {
        if (type === "addSection") {
            project.sections.push(sections);
            console.log("Section Added");
        } else if (type === "updateSections") {
            project.sections = sections;
            console.log("Sections Updated");
        }
    }
    if (fields) {
        if (type === "addField"){
            console.log("Field Added");
            project.fields.push(fields);
        } else if (type === "takeField") {
            console.log("Field Taken");
            project.fields = fields;
        } else if ( type === "updateField") {
            console.log("Field Updated");
            project.fields = fields;
        }
    }
    const updatedProject = await project.save()
    
    res.json(`'${updatedProject.title}' updated`)
}

const deleteProject = async (req, res) => {
    
    const { id } = req.body;

    if (!id ) {
        return res.status(400).json({ message: "Project ID Required" });
    }

    const project = await Project.findById(id).exec();

    if (!project) {
        return res.status(404).json({ message: "No Project Found" });
    }

    const result = await project.deleteOne();

    const reply = `Project '${result.title}' with ID ${result._id} deleted`

    res.json(reply);
    
}


module.exports = {
    getAllProjects,
    createNewProject,
    updateProject,
    deleteProject
};