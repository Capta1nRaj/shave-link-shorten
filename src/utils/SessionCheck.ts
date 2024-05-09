import axios from "axios";

export async function SessionCheck() {
    try {
        const { data: { status, message, userName } } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_NAME_1}/api/EmailArmorAPIs/localSessionCheck`);

        if (status === 202) {
            window.location.href = `${process.env.NEXT_PUBLIC_DOMAIN_NAME_2}/dashboard` || "http://localhost:3001/dashboard";
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
}