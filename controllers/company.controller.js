// import {communicators, location} from "../model/company.model.js";
import { location,communicators } from "../model/company.model.js";

export const getLocation = async (req, res) => {
    try {
      const Datas = await  location.findAll();
  
      return res.status(200).json({
        success: true,
        message: 'successfully',
        data: Datas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};
export const getCommunicators = async (req, res) => {
  try {
    const Datas = await  communicators.findAll();

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: Datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const addLocation = async (req, res) => {
    const { id, address, phone, email1, email2, map } = req.body;
    try {
      const newDatas = await location.create({ id: id, address: address, phone: phone, email1: email1, email2: email2, map: map });
      res.status(201).json({
        newDatas
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};
export const addCommunicators = async (req, res) => {
  const { contact_id, name, email, phone, company_name, message } = req.body;
  try {
    const newDatas = await communicators.create({ contact_id: contact_id, name: name, email: email, phone: phone, company_name: company_name, message: message });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const updateLocation = async (req, res) => {
  const { id, address, phone, email1, email2, map } = req.body;
  try {
    const updatedLocation = await location.update(
      {
        address: address,
        phone: phone,
        email1: email1,
        email2: email2,
        map: map,
      },
      { where: { id: id } }
    );

    if (updatedLocation[0] === 1) {
      return res.status(200).json({
        success: true,
        message: 'Location updated successfully',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const updateCommunicators = async (req, res) => {
  const { contact_id, name, email, phone, company_name, message } = req.body;
  try {
    const updatedCommunicator = await communicators.update(
      {
        name: name,
        email: email,
        phone: phone,
        company_name: company_name,
        message: message,
      },
      { where: { contact_id: contact_id } }
    );

    if (updatedCommunicator[0] === 1) {
      return res.status(200).json({
        success: true,
        message: 'Communicator updated successfully',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Communicator not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await location.destroy({ where: { id: id } });

    if (deletedRows === 1) {
      return res.status(200).json({
        success: true,
        message: 'Location deleted successfully',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Location not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const deleteCommunicators = async (req, res) => {
  const { contact_id } = req.params;
  try {
    const deletedRows = await communicators.destroy({ where: { contact_id: contact_id } });

    if (deletedRows === 1) {
      return res.status(200).json({
        success: true,
        message: 'Communicator deleted successfully',
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Communicator not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};





