import { Roboto } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/reduxProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const roboto = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"],
});

export const metadata = {
	title: "rajkalp-resorts",
	description: "Best resort in Tadoba",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				{/* <Navbar /> */}
				<ReduxProvider>{children}</ReduxProvider>
				{/* <Footer /> */}
			</body>
		</html>
	);
}
