import { motion } from "framer-motion";

export default function AuthHero() {

    return (

        <div className="hidden lg:flex w-[60%] relative overflow-hidden bg-gradient-to-br from-blue-700 via-slate-900 to-[#050816]">

            <div className="absolute h-[600px] w-[600px] rounded-full bg-blue-500/20 blur-[120px] -left-32 top-10"/>

            <div className="relative z-10 flex flex-col justify-center px-24">

                <span className="w-fit rounded-full bg-white/10 px-5 py-2 text-white backdrop-blur-lg">

                    📦 WarehouseOS

                </span>

                <motion.h1

                    initial={{opacity:0,x:-50}}

                    animate={{opacity:1,x:0}}

                    transition={{duration:.7}}

                    className="mt-10 text-7xl font-black leading-tight text-white"

                >

                    Manage

                    <br/>

                    Inventory

                    <br/>

                    Like Never

                    <br/>

                    Before

                </motion.h1>

                <motion.p

                    initial={{opacity:0}}

                    animate={{opacity:1}}

                    transition={{delay:.4}}

                    className="mt-8 max-w-xl text-xl leading-9 text-slate-300"

                >

                    Smart inventory management,

                    warehouse tracking,

                    purchase orders,

                    sales analytics,

                    and real-time stock monitoring.

                </motion.p>

            </div>

        </div>

    );

}