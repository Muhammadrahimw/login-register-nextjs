"use client";

import type {UserType} from "@/@types";
import axios from "axios";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useRef, useState} from "react";

export const RegisterComponent = () => {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const postFetch = async (data: UserType) => {
		setIsloading(true);
		try {
			const response = await axios.post(
				`https://6759b459099e3090dbe2a4ae.mockapi.io/data/users`,
				data
			);
			setIsloading(false);
			router.push(`/`);
		} catch (error) {
			setIsloading(false);
			console.log(error);
		}
	};

	const registerFunc = async () => {
		const name = nameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		if (!name || !email || !password) {
			return alert(`Please fill in all fields!`);
		}

		postFetch({name, email, password});
	};

	return (
		<section className="flex items-center justify-center w-[25em] mx-auto text-center h-screen flex-col">
			<h2 className="text-4xl font-semibold">Create an account</h2>
			<p className="text-gray-400 mt-3">
				Let’s get started. Fill in the details below to create your account.
			</p>
			<div className="mt-7 w-full">
				<input
					ref={nameRef}
					type="text"
					placeholder="Name"
					className="pl-3 w-full h-10 rounded border border-gray-300 outline-none"
				/>
			</div>
			<div className="mt-4 w-full">
				<input
					ref={emailRef}
					type="email"
					placeholder="Email"
					className="pl-3 w-full h-10 rounded border border-gray-300 outline-none"
				/>
			</div>
			<div className="mt-4 w-full">
				<input
					ref={passwordRef}
					type="password"
					placeholder="Password"
					className="pl-3 w-full h-10 rounded border border-gray-300 outline-none"
				/>
			</div>
			<button
				onClick={registerFunc}
				type="button"
				className="mt-6 rounded bg-black text-white w-full h-10 flex items-center justify-center">
				{isLoading ? <Loader2 className="animate-spin" /> : "Sign in"}
			</button>
		</section>
	);
};
