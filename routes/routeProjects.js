const express = require("express");
const db = require("../data/helpers/projectModel");

const router = express.Router();

//get all projects
router.get("/", async (req, res) => {
  try {
    const allProjects = await db.get();
    res.json({ message: allProjects });
  } catch (err) {
    res.status(500).json({ message: "Error: server conflict"  });
  }
});

//get project by ID
router.get("/:id", validateID, async (req, res) => {
  const singleProject = await db.get(req.params.id);
  res.json({ message: singleProject });
});

//add project
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newProject = await db.insert(req.body);
    res.json({ message: newProject });
  } catch (err) {
    res.status(500).json({ message: "Error: server conflict"  });
  }
});

//update action
router.put("/:id", validateID, async (req, res) => {
  try {
    const updatedProject = await db.update(req.params.id, req.body);
    res.json({ message: updatedProject });
  } catch (err) {
    res.status(500).json({ message: "Error: server conflict"  });
  }
});

//remove project
router.delete("/:id", validateID, async (req, res) => {
  try {
    const deletedProject = await db.remove(req.params.id);
    res.json({ message: deletedProject });
  } catch (err) {
    res.status(500).json({ message: "Error: server conflict"  });
  }
});

//getProjectActions
router.get("/:id/actions", validateID, async (req, res) => {
  const { id } = req.params;

  try {
    const projectActions = await db.getProjectActions(id);
    res.json({ message: projectActions });
  } catch (err) {
    res.status(500).json({ message: "Error: server conflict"  });
  }
});

async function validateID(req, res, next) {
  if (!req.params.id) {
    res.status(400).json({ message: "Id is required" });
  } else {
    const idValidate = await db.get(req.params.id);
    if (!idValidate) {
      res.status(404).json({ message: "invalid user ID" });
    }
  }
  next();
}

module.exports = router;