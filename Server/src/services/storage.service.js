import ImageKit, { toFile } from "@imagekit/nodejs"

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

export const uploadFile = async ({buffer, fileName}) => {
    try {
        const response = await client.files.upload({
            file: await toFile(buffer),
            fileName: fileName, 
            folder: "snitch"
        })
        return response;
    } catch (error) {
        console.log(`Error in uploading image - ${error.message}`);
        throw error;
    }
} 