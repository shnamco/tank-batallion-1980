import db from '../models';

const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
export const create = (req: any, res: any): any => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    cl: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Tutorial.'
      });
    });
};

// Retrieve all Tutorials from the database.
export const findAll = (req: any, res: any): any => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.'
      });
    });
};

// Find a single Tutorial with an id
export const findOne = (req: any, res: any): any => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: 'Error retrieving Tutorial with id=' + id
      });
    });
};

// Update a Tutorial by the id in the request
export const update = (req: any, res: any): any => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: 'Tutorial was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: 'Error updating Tutorial with id=' + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
export const deletee = (req: any, res: any): any => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then((num: any) => {
      if (num == 1) {
        res.send({
          message: 'Tutorial was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch((err: any) => {
      res.status(500).send({
        message: 'Could not delete Tutorial with id=' + id
      });
    });
};

// Delete all Tutorials from the database.
export const deleteAll = (req: any, res: any): any => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then((nums: any) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all tutorials.'
      });
    });
};

// find all published Tutorial
export const findAllPublished = (req: any, res: any): any => {
  Tutorial.findAll({ where: { published: true } })
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tutorials.'
      });
    });
};
