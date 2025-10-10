import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOutAction } from '../_lib/actions';

// We can call server actions in both Client Component like this as well as Server Components but the Server Actions
// will automatically be executed on server, it will never leak to the client 
function SignOutButton() {
    return (
        <form action={signOutAction}>
            <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
                <span>Sign out</span>
            </button>
        </form>
    );
}

export default SignOutButton;
