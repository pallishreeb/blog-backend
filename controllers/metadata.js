const Metadata = require("../models/metadata");
const { ObjectId } = require("mongodb");

module.exports = {
    //metadata
    getMetadata: async (_, res) => {
        try {
            const metadata = await Metadata.find({}).sort({ createdAt: -1 }).exec();
            return res.status(200).json({
                success: true,
                message: `Metadata recieved`,
                response: metadata,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },
    getMetadataForEdit: async (req, res) => {
        try {
            const { metadataId } = req.query;
            let id = metadataId
            const metadata = await Metadata.findById(id);
            if (!metadata) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: "Invalid id, metadata not found",
                        response: {},
                    });
            }
            return res
                .status(200)
                .json({ success: true, message: "metadata found", response: metadata });
        } catch (error) {
            return res
                .status(500)
                .json({
                    success: false,
                    message: "Internal Server Error",
                    error: error.message,
                });
        }
    },
    createMetadata: async (req, res) => {
        try {
            const { siteName, description, logo, email, phoneNumber, featureImage } = req.body;
            const isExist = await Metadata.findOne({ siteName: siteName });
            if (isExist) {
                return res.status(403).json({
                    success: false,
                    message: "Metadata already exist with same siteName",
                    response: {},
                });
            }
            const newMetadata = await new Metadata({
                siteName,
                description,
                logo,
                email,
                phoneNumber, featureImage
            });
            await newMetadata.save();
            return res.status(200).json({
                success: false,
                message: "Created successfully",
                response: newMetadata,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },
    deleteMetadata: async (req, res) => {
        try {
            const { metadataId } = req.query;
            const metadata = await Metadata.findByIdAndDelete({ _id: ObjectId(metadataId) });
            if (!metadata) {
                return res
                    .status(404)
                    .json({ success: false, message: "Invalid id", response: {} });
            }
            return res.status(200).json({
                success: true,
                message: "Metadata deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    },

    updateMetadata: async (req, res) => {
        console.log("body", req.body);
        try {
            const { metadataId } = req.query;
            const { siteName, description, logo, email, phoneNumber, featureImage } = req.body;

            const metadata = await Metadata.findById({ _id: ObjectId(metadataId) });
            if (!metadata) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid id, metadata not found",
                    response: {},
                });
            }
            if (siteName) {
                metadata.siteName = siteName
            }
            if (description) {
                metadata.description = description
            }
            if (logo) {
                metadata.logo = logo
            }
            if (email) {
                metadata.email = email
            }
            if (phoneNumber) {
                metadata.phoneNumber = phoneNumber
            }
            if (featureImage) {
                metadata.featureImage = featureImage
            }
            await metadata.save();
            return res.status(200).json({
                success: true,
                message: "Metadata updated successfully",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
}