import Cab from "../models/cab.model.js";

export const addCab = async (req, res) => {
  try {
    const cab = await Cab.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Cab created successfully",
      data: cab,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCab = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCab = await Cab.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCab) {
      return res.status(404).json({ success: false, message: "Cab not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Cab updated successfully",
      data: updatedCab,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCab = async (req, res) => {
  try {
    const { id } = req.params;

    const cab = await Cab.findByIdAndDelete(id);

    if (!cab) {
      return res.status(404).json({
        success: false,
        message: "Cab not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cab deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleCabStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const cab = await Cab.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!cab) {
      return res.status(404).json({
        success: false,
        message: "Cab not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Cab is now ${active ? "Active" : "Inactive"}`,
      data: cab,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
