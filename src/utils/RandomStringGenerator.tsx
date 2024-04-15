// Generating Random String Using randomString Module
import randomstring from "randomstring";

async function RandomStringGenerator(length: number) {
    return randomstring.generate({
        length: length,
        charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    });
}

export default RandomStringGenerator;