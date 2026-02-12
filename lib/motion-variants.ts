
export const transitions = {
    springDamp: { type: "spring", stiffness: 300, damping: 30 },
    springBouncy: { type: "spring", stiffness: 500, damping: 20 },
    easeOut: { ease: [0.25, 0.8, 0.25, 1], duration: 0.5 },
};

export const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: transitions.springDamp
    },
};

export const scaleTap = { scale: 0.96 };
export const hoverLift = { y: -5 };

export const shutterVariants = {
    initial: { opacity: 0, rotate: -90, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 0, rotate: 90, scale: 0.5 },
};
