"use client";

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const Home = () => {
	const router = useRouter();
	const [name, setName] = useState("");

	useEffect(() => {
		const token = localStorage.getItem(`token`);
		if (!token) {
			router.push(`/login`);
		} else {
			setName(localStorage.getItem(`name`) || "");
		}
	}, [router]);

	const logOut = () => {
		localStorage.clear();
		router.push(`/login`);
	};

	return (
		<div className="flex items-center flex-col justify-center h-screen max-sm:text-xs max-sm:leading-none max-[420px]:text-[0.5em]">
			<h1 className="text-[4em] text-center">
				Welcome,
				<span className="capitalize"> {name}</span>
			</h1>
			<button
				onClick={logOut}
				className="text-white font-semibold tracking-wide mt-4 bg-gray-400 px-7 py-2 rounded-md"
				type="button">
				Log out
			</button>
		</div>
	);
};

export default Home;
