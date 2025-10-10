import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo.png';

function Logo() {
    return (
        <Link href="/" className="flex items-center gap-4 z-10">
            {/* Below is the 1st way to use Imnage component from 'next/image'. Here we must need to mandatorily  specify width and height of image*/}
            {/* <Image
                src="/logo.png"
                height="60"
                width="60"
                alt="The Wild Oasis logo"
            /> */}

            {/* Below is the 2nd way to use Imnage component from 'next/image'. Here in src we need to pass imported image in src not the path. 
            We don't need to mandatorily specify width and height (Optional). Also we have the option here to determine the picture quality (1-100)*/}
            <Image
                src={logo}
                alt="The Wild Oasis logo"
                height="60"
                width="60"
                quality={100}
            />
            <span className="text-xl font-semibold text-primary-100">
                The Wild Oasis
            </span>
        </Link>
    );
}

export default Logo;
