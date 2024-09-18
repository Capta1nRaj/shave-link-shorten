export const NavBarConstants = [
    {
        "title": "features",
        "link": "/#features",
        "css": "text-xl sm:block hidden text-custom-white hover:text-custom-blue defaultTransitionCSS"
    },
    {
        "title": "pricing",
        "link": "/#pricing",
        "css": "text-xl sm:block hidden text-custom-white hover:text-custom-blue defaultTransitionCSS"
    },
    {
        "title": "login",
        "link": "/signin",
        "css": "text-custom-white hover:text-custom-blue defaultTransitionCSS"
    },
    {
        "title": "sign up",
        "link": "/signup",
        "css": "bg-custom-blue text-custom-white hover:text-custom-dark hover:bg-custom-white px-8 py-2 rounded-full defaultTransitionCSS"
    },
    {
        "title": "dashboard",
        "link": process.env.NEXT_PUBLIC_DOMAIN_NAME_2 || "http://localhost:3001",
        "css": "bg-custom-blue text-custom-white hover:text-custom-dark hover:bg-custom-white px-6 py-2 rounded-full defaultTransitionCSS"
    }
]