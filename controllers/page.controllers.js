// import {clients} from "../model/clients.model.js";
import {location} from "../model/company.model.js";
import {Users} from "../model/users.model.js";
import {home,about,about_container,services,services_container,team,portfolio} from "../model/pages.model.js";
import { projects } from "../model/projects.model.js";
export const getHome = async (req, res) => {
  try {
    const Datas = await home.findOne({ where: { text_id: 1 } });

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: {
        title: Datas.title, // Access the title directly
        description: Datas.description, // Access the description directly
        container_datas: await home.findAll(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getAbout = async (req, res) => {
  try {
    const Datas = await about.findOne({ where: { text_id: 1 } });

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: {
        title: Datas.title, // Access the title directly
        description: Datas.description, // Access the description directly
        container_datas: await about_container.findAll(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getServices = async (req, res) => {
  try {
    const Datas = await services.findOne({ where: { text_id: 1 } });
    
    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: {
        title: Datas.title, // Access the title directly
        description: Datas.description, // Access the description directly
        container_datas: await services_container.findAll(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getTeam = async (req, res) => {
  try {
    const Datas = await team.findOne({ where: { text_id: 1 } });

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: {
        title: Datas.title, // Access the title directly
        description: Datas.description, // Access the description directly
        container_datas: await Users.findAll(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getPortfolio = async (req, res) => {
  try {
    const Datas = await portfolio.findOne({ where: { text_id: 1 } });

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: {
        title: Datas.title, // Access the title directly
        description: Datas.description, // Access the description directly
        container_datas: await projects.findAll(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const home_addData = async (req, res) => {
  const { text_id ,title, description, img } = req.body;
  try {
    const newDatas = await home.create({ text_id: text_id, title: title, description: description, img: img });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const about_addData = async (req, res) => {
  const { text_id ,title, description, img } = req.body;
  try {
    const newDatas = await about.create({ text_id: text_id, title: title, description: description, img: img });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const services_addData = async (req, res) => {
  const { text_id ,title, description, img } = req.body;
  try {
    const newDatas = await services.create({ text_id: text_id, title: title, description: description, img: img });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const team_addData = async (req, res) => {
  const { text_id ,title, description, img } = req.body;
  try {
    const newDatas = await team.create({ text_id: text_id, title: title, description: description, img: img });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const portfolio_addData = async (req, res) => {
  const { text_id ,title, description, img } = req.body;
  try {
    const newDatas = await portfolio.create({ text_id: text_id, title: title, description: description, img: img });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const about_container_addData = async (req, res) => {
  const { text_id ,title, description, img } = req.body;
  try {
    const newDatas = await about_container.create({ text_id: text_id, title: title, description: description, img: img });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const services_container_addData = async (req, res) => {
  const { text_id ,title, description, img } = req.body;
  try {
    const newDatas = await services_container.create({ text_id: text_id, title: title, description: description, img: img });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Update Home
export const updateHome = async (req, res) => {
  const { text_id, title, description, img } = req.body;
  try {
    const updatedDatas = await home.update(
      { title, description, img },
      { where: { text_id } }
    );
    res.status(200).json({ updatedDatas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update About
export const updateAbout = async (req, res) => {
  const { text_id, title, description, img } = req.body;
  try {
    const updatedDatas = await about.update(
      { title, description, img },
      { where: { text_id } }
    );
    res.status(200).json({ updatedDatas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Services
export const updateServices = async (req, res) => {
  const { text_id, title, description, img } = req.body;
  try {
    const updatedDatas = await services.update(
      { title, description, img },
      { where: { text_id } }
    );
    res.status(200).json({ updatedDatas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Team
export const updateTeam = async (req, res) => {
  const { text_id, title, description, img } = req.body;
  try {
    const updatedDatas = await team.update(
      { title, description, img },
      { where: { text_id } }
    );
    res.status(200).json({ updatedDatas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Portfolio
export const updatePortfolio = async (req, res) => {
  const { text_id, title, description, img } = req.body;
  try {
    const updatedDatas = await portfolio.update(
      { title, description, img },
      { where: { text_id } }
    );
    res.status(200).json({ updatedDatas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Delete Home
export const deleteHome = async (req, res) => {
  const { text_id } = req.params;
  try {
    const deletedDatas = await home.destroy({ where: { text_id } });

    if (deletedDatas === 0) {
      return res.status(404).json({
        success: false,
        message: 'Home data not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully deleted home data',
      data: deletedDatas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete About
export const deleteAbout = async (req, res) => {
  const { text_id } = req.params;
  try {
    const deletedDatas = await about.destroy({ where: { text_id } });

    if (deletedDatas === 0) {
      return res.status(404).json({
        success: false,
        message: 'About data not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully deleted about data',
      data: deletedDatas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete Services
export const deleteServices = async (req, res) => {
  const { text_id } = req.params;
  try {
    const deletedDatas = await services.destroy({ where: { text_id } });

    if (deletedDatas === 0) {
      return res.status(404).json({
        success: false,
        message: 'Services data not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully deleted services data',
      data: deletedDatas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete Team
export const deleteTeam = async (req, res) => {
  const { text_id } = req.params;
  try {
    const deletedDatas = await team.destroy({ where: { text_id } });

    if (deletedDatas === 0) {
      return res.status(404).json({
        success: false,
        message: 'Team data not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully deleted team data',
      data: deletedDatas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete Portfolio
export const deletePortfolio = async (req, res) => {
  const { text_id } = req.params;
  try {
    const deletedDatas = await portfolio.destroy({ where: { text_id } });

    if (deletedDatas === 0) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio data not found',
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully deleted portfolio data',
      data: deletedDatas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};