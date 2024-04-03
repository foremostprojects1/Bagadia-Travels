import firebase from "../firebase.js";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Tour from "../models/tourModel.js";

function generateUniqueFileName() {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomString}`;
}

export const addTour = async (req, res) => {
  // console.log(JSON.stringify(req.body.modeDetails));
  try {
    const {
      title,
      price,
      images,
      places,
      maxPeople,
      days,
      nights,
      tourType,
      tourDescription,
      included,
      excluded,
      daysDescription,
      daysTitles,
      country,
      
      transportMode,
    } = req.body;
    // console.log(req.body)
    const modeDetails = JSON.parse(req.body.modeDetails);
    const returnModeDetails = JSON.parse(req.body.returnModeDetails);
    let imagesArray = [];

    // Check if images is an array
    if (Array.isArray(images)) {
      imagesArray = images;
    } else if (typeof images === 'string') {
      // If images is a string, convert it to an array with a single element
      imagesArray.push(images);
    } else {
      // Handle other cases where images is not an array or a string
      throw new Error("Images must be provided as an array or a string");
    }

    const storage = getStorage(firebase);

    const uploadPromises = [];
    const downloadURLs = [];

    imagesArray.forEach((image, index) => {
      const base64Data = image.split(",")[1];
      const storageRef = ref(
        storage,
        `tours/${generateUniqueFileName()}_${index}.jpg`
      );

      // Start the upload task and store the promise
      const uploadPromise = uploadString(storageRef, base64Data, "base64");
      uploadPromises.push(uploadPromise);
    });

    // Wait for all upload tasks to complete
    const snapshots = await Promise.all(uploadPromises);

    // Retrieve download URLs for each uploaded image
    snapshots.forEach((snapshot) => {
      const downloadURLPromise = getDownloadURL(snapshot.ref);
      downloadURLs.push(downloadURLPromise);
    });

    // Wait for all download URL retrieval tasks to complete
    const urls = await Promise.all(downloadURLs);

    // Log the upload results and download URLs
    snapshots.forEach((snapshot) => {
      // console.log(snapshot);
      // console.log("Uploaded a base64 string!");
    });

    //urls contains all links of download URLs
    
    const tour = new Tour({
      title,
      price,
      images: urls,
      places,
      maxPeople,
      days,
      nights,
      tourType,
      tourDescription,
      included,
      excluded,
      daysDescription,
      daysTitles,
      transportMode,
      country,
      modeDetails,
      returnModeDetails
    });

    await tour.save();

    res.status(200).json({
      success: true,
      message: "Tour Created Successfully",
    });
  } catch (e) {
    console.log("error" + e)
    res.status(400).json({
      message: e.message || "An error occurred",
      success: false,
    });
  }
};
export const deleteTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id);
    // console.log("tour => ", tour);

    if (tour && tour.images && tour.images.length > 0) {
      const storage = getStorage(firebase);
      // const storageRef = storage.ref();

      tour.images.forEach(async (url) => {
        const desertRef = ref(storage, url);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
            // console.log("File deleted successfully");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      });
    }

    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Tour Deleted Successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: e,
      success: false,
    });
  }
};

export const getTours = async (req, res) => {
  try {
    const tour = await Tour.find({});

    res.status(200).json({
      success: true,
      tour: tour,
    });
  } catch (e) {
    res.status(400).json({
      message: e,
      success: false,
    });
  }
};

export const getTourById = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findById(id);

    res.status(200).json({
      success: true,
      tour: tour,
    });
  } catch (e) {
    res.status(400).json({
      message: e,
      success: false,
    });
  }
};

export const getToursByName = async (req, res) => {
  try {
    const { destination } = req.params;
    // console.log("hello "  + destination)

    const tours = await Tour.find({ title: { $regex: new RegExp(destination, "i") } });

    // console.log(tours)
    res.status(200).json({
      success: true,
      tour: tours,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
      success: false,
    });
  }
};
