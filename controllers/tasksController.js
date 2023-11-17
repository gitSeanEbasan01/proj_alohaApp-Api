const Task = require('../models/Task'); //Empty


const getAllTasks = async (req, res) => {
    
    const tasks = await Task.find().lean();

    if (!tasks?.length) {
        return res.status(200).json(tasks)
        // res.json(tasks);
    }

    res.json(tasks);

};

const createNewTask = async (req, res) => {

    
    const { 
        isChecked,
        users,
        usersAssigned,
        title, 
        description, 
        project, 
        section, 
        fields 
    } = req.body;
    // ...Add date later..
    
    
    if (!usersAssigned || !title || !description) {
        return res.status(400).json({ message: 'Fill required fields' });
    }
    
    // const duplicate = await Task.findOne({ title }).collation({ locale: 'en', strngth: 2 }).lean().exec();
    const duplicate = await Task.findOne({ title }).lean().exec();
    
    if (duplicate && duplicate.project === project) {
        // 409 - Conflict Error
        return res.status(409).json({ message: 'Task title already exist' });
    }
    
    


    const task = await Task.create({ isChecked, users, usersAssigned, title, description, project, section, fields });

    
    if (task) {
        // console.log(task);
        return res.status(201).json({ message: 'New Task created' });
    } else {
        return res.status(400).json({ message: 'Invalid task data received' });
    }
    
};

const updateTask = async (req, res) => {

    const {
        id,
        isChecked,
        project,
        section,
        usersAssigned,
        title,
        description,
        fields
    } = req.body;

    if (!id || typeof(isChecked) !== 'boolean' || !project || !section || !usersAssigned || !title || !description || !fields) {
        if (!id) {
            console.log(`No id`)
        }
        if (typeof(isChecked) !== 'boolean') {
            console.log(`No isChecked`)
        }
        if (!project) {
            console.log(`No project`)
        }
        if (!section) {
            console.log(`No section`)
        }
        if (!usersAssigned) {
            console.log(`No usersAssigned`)
        }
        if (!title) {
            console.log(`No title`)
        }
        if (!description) {
            console.log(`No description`)
        }
        if (!fields) {
            console.log(`No fields`)
        }
        return res.status(400).json({ message: 'All Fields Required' });
    }

    const task = await Task.findById(id).exec();

    if (!task) {
        return res.status(400).json({ message: 'Task Not Found' });
    }

    task.isChecked = isChecked;
    task.title = title;
    task.section = section;
    task.usersAssigned = usersAssigned;
    task.fields = fields;

    const updateTask = await task.save();

    res.json(`'${updateTask.title}' Updated`);
};

const updateTasks = async (req, res) => {

    const {
        project: projectId,
        tasks,
        field,
        type,
        sectionKey,
        defaultSectionKey
    } = req.body;

    if (!projectId) {
        return res.status(400).json({ message: 'ProjectId Required' })
    }

    const tasksByProject = await Task.find({ project: projectId }).exec();

    // ...Adding a field might cause an error with this...
    if (!tasksByProject) {
        return res.status(400).json({ message: 'Tasks Not Found' });
    }

    if (tasks) {
        for (const taskByProject of tasksByProject) {
            for (let t = 0; t < tasks.length; t++) {
                const task = tasks[t];
                if (taskByProject._id.toString() === task.id) {
                    taskByProject.field = task.field;
                    await taskByProject.save()
                }
            }
        }
    }
    if (field) {
        if (type === 'addField') {
            for (const task of tasksByProject) {
                task.fields.push(field);
                await task.save();
            }
        }else if (type === 'updateField') {
            for (const projTask of tasksByProject) {
                for (let i = 0; i < field.length; i++) {
                    let newField = field[i];
                    if (projTask._id.toString() === newField.id){
                        projTask.fields = newField.fields;
                        await projTask.save();
                    }
                }
            }
        }
    }
    if (sectionKey) {
        for (const task of tasksByProject) {
            if (task.section.sectionKey === sectionKey) {
                task.section = {sectionKey: defaultSectionKey}
                await task.save();
            }
        }
    }



    res.json({ message: 'Tasks Updated'})
    
}

const deleteTask = async (req, res) => {

    console.log("Deleting Single Task");
    
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'Task ID Required' });
    }

    const task = await Task.findById(id).exec();

    if (!task) {
        return res.status(400).json({ message: 'No Task Found' });
    }

    const result = await task.deleteOne();

    const reply = `Task '${result.title}' with ID ${result._id} deleted`

    res.json(reply);

}

const deleteTasks = async (req, res) => {

    console.log("Deleting Mulitple Tasks");
    
    const { taskIds } = req.body;

    console.log(taskIds);

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
        return res.status(400).json({ message: "TaskIds Required" });
    }

    console.log("passed taskids requirements");

    let deletedTasks = [];
    
    for (const taskId of taskIds) {
        const task = await Task.findById(taskId).exec();
        if (task) {
            const result = await task.deleteOne();

            deletedTasks.push({id: result._id, title: result.title})
        }
    }

    console.log("passed taskids deletion");

    if (deletedTasks.length > 0) {
        return res.json({ message: 'Task Deleted ', deletedTasks });
    } else {
        return res.status(400).json({ message: 'No Task to Delete' })
    }
    
}


module.exports = {
    getAllTasks,
    createNewTask,
    updateTasks,
    updateTask,
    deleteTask,
    deleteTasks
};