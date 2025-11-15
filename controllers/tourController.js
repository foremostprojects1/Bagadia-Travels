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
      tourDepartureDate,
      transportMode,
    } = req.body;
    // console.log(req.body)
    const modeDetails = JSON.parse(req.body.modeDetails);
    const returnModeDetails = JSON.parse(req.body.returnModeDetails);
    const hotelDetails = JSON.parse(req.body.hotelDetails);
    const paxData = JSON.parse(req.body.paxData);

    let imagesArray = [];

    // Check if images is an array
    if (Array.isArray(images)) {
      imagesArray = images;
    } else if (typeof images === "string") {
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
      tourDepartureDate,
      returnModeDetails,
      hotelDetails,
      paxData,
    });

    await tour.save();

    res.status(200).json({
      success: true,
      message: "Tour Created Successfully",
    });
  } catch (e) {
    console.log("error" + e);
    res.status(400).json({
      message: e.message || "An error occurred",
      success: false,
    });
  }
};
export const updateTour = async (req, res) => {
  try {
    const tourId = req.params.id;

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
      transportMode,
      country,
      tourDepartureDate,
    } = req.body;
    const modeDetails = JSON.parse(req.body.modeDetails);
    const returnModeDetails = JSON.parse(req.body.returnModeDetails);
    const hotelDetails = JSON.parse(req.body.hotelDetails);
    const paxData = JSON.parse(req.body.paxData);
    let existingTour;

    try { 
      existingTour = await Tour.findById(tourId);
    } catch (error) {
      console.error("Error fetching tour:", error);
      return res.status(404).json({
        message: "Tour not found",
        success: false,
      });
    }
    
    let updatedImages = [];
    let imagesArray = [];
    
    if (Array.isArray(images)) {
      imagesArray = images;
    } else if (typeof images === "string") {
      imagesArray.push(images);
    } else {
      throw new Error("Images must be provided as an array or a string");
    }
    
    
    if (images) {
      const storage = getStorage(firebase);

      if (typeof images[0] === "string") { // Check if images are Firebase storage links
        // Images are already uploaded, use them directly
        updatedImages = images;
      } else {
        // Images are base64, upload them to Firebase Storage
        const uploadPromises = [];
        const downloadURLs = [];

        images.forEach((image, index) => {
          const base64Data = image.split(",")[1];
          const storageRef = ref(
            storage,
            `tours/${generateUniqueFileName()}_${index}.jpg`
          );

          const uploadPromise = uploadString(storageRef, base64Data, "base64");
          uploadPromises.push(uploadPromise);
        });

        const snapshots = await Promise.all(uploadPromises);

        snapshots.forEach((snapshot) => {
          const downloadURLPromise = getDownloadURL(snapshot.ref);
          downloadURLs.push(downloadURLPromise);
        });

        const urls = await Promise.all(downloadURLs);

        updatedImages = urls;
      }

      // Delete old images if new ones are uploaded (excluding unchanged ones)
      const imagesToDelete = existingTour.images.filter(
        (url) => !updatedImages.includes(url)
      );

      if (imagesToDelete.length > 0) {
        const deletePromises = imagesToDelete.map((url) => {
          const imageRef = ref(storage, url);
          return deleteObject(imageRef);
        });

        await Promise.all(deletePromises);
      }
    } else {
      // Use existing images if no new ones are provided
      updatedImages = existingTour.images;
    }

    existingTour.title = title || existingTour.title;
    existingTour.images = updatedImages;
    existingTour.price = price || existingTour.price;
    existingTour.paxData = paxData || existingTour.paxData;
    existingTour.places = places || existingTour.places;
    existingTour.maxPeople = maxPeople || existingTour.maxPeople;
    existingTour.days = days || existingTour.days;
    existingTour.nights = nights || existingTour.nights;
    existingTour.tourType = tourType || existingTour.tourType;
    existingTour.tourDescription =
      tourDescription || existingTour.tourDescription;
    existingTour.included = included || existingTour.included;
    existingTour.excluded = excluded || existingTour.excluded;
    existingTour.daysDescription =
      daysDescription || existingTour.daysDescription;
    existingTour.daysTitles = daysTitles || existingTour.daysTitles;
    existingTour.transportMode = transportMode || existingTour.transportMode;
    existingTour.country = country || existingTour.country;
    existingTour.modeDetails = modeDetails || existingTour.modeDetails;
    existingTour.hotelDetails = hotelDetails || existingTour.hotelDetails;
    existingTour.returnModeDetails =
      returnModeDetails || existingTour.returnModeDetails;
    existingTour.tourDepartureDate =
      tourDepartureDate || existingTour.tourDepartureDate;

    await existingTour.save();

    res.status(200).json({
      success: true,
      message: "Tour Updated Successfully",
    });
  } catch (e) {
    console.error("Error updating tour:", e);
    res.status(400).json({
      message: e.message || "An error occurred while updating the tour",
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

    const tours = await Tour.find({
      country: { $regex: new RegExp(destination, "i") },
      active: true,
    });
    

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

export const toggleTourStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const tour = await Tour.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    return res.status(200).json({
      message: active
        ? "Tour activated successfully"
        : "Tour deactivated successfully",
      tour,
    });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
