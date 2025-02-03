"use client";

import type {UserType} from "@/@types";
import axios from "axios";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useRef, useState} from "react";

export const LoginComponent = () => {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const fetchData = async () => {
		setIsloading(true);
		try {
			const response = await axios.get(
				`https://6759b459099e3090dbe2a4ae.mockapi.io/data/users`
			);
			setIsloading(false);
			return response.data;
		} catch (error) {
			setIsloading(false);
			console.log(error);
		}
	};

	const loginFunc = () => {
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		if (!email || !password) {
			return alert(`Email or password is required`);
		}

		if (email && password) {
			fetchData().then((data: UserType[]) => {
				const user = data.find((value) => value.email === email);

				if (!user) {
					return alert(`you are not registered`);
				}

				if (user.password !== password) {
					return alert(`Your password is not correct`);
				}

				router.push(`/`);
			});
		} else {
			alert(`email or password is required`);
		}
	};

	return (
		<section className="flex items-center justify-center w-[25em] mx-auto text-center h-screen flex-col">
			<h2 className="text-4xl font-semibold">Sign in</h2>
			<p className="text-gray-400 mt-3">
				Log in to unlock tailored content and stay connected with your
				community.
			</p>
			<div className="mt-7 w-full">
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
				onClick={loginFunc}
				type="button"
				className="mt-6 rounded bg-black text-white w-full h-10 flex items-center justify-center">
				{isLoading ? <Loader2 className="animate-spin" /> : "Sign in"}
			</button>
		</section>
	);
};
