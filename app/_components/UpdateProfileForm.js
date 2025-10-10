'use client';

import { updateGuest } from '@/app/_lib/actions';
import SubmitButton from '@/app/_components/SubmitButton';

/*
import { useFormStatus } from 'react-dom';
function Button() {
    const { pending } = useFormStatus();
    // useFormSftus cannot use inside the component that contains the HTML form tag '<form>'
    // We have to place 'useFormStatus' hook inside a component which is rendered inside the component with HTML form tag '<form>'
    // See here 'Button' component is rendered inside 'UpdateProfileForm' which has HTML form tag '<form>'
    // So it is our compulsion (majboori) to make a separate component for 'Button' otherwise there is no need to make separate 'Button' component

    return (
        <button
            disabled={pending}
            className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        >
            {pending ? 'Updating...' : 'Update profile'} 
        </button>
    );
}
*/

export default function UpdateProfileForm({ guest, children }) {
    const { fullName, email, nationality, nationalID, countryFlag } = guest;

    return (
        <form
            action={updateGuest}
            className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        >
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    disabled
                    name="fullName"
                    defaultValue={fullName}
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>
            <div className="space-y-2">
                <label>Email address</label>
                <input
                    disabled
                    name="email"
                    defaultValue={email}
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    <img
                        src={countryFlag}
                        alt="Country flag"
                        className="h-5 rounded-sm"
                    />
                </div>
                {children}
            </div>
            <div className="space-y-2">
                <label htmlFor="nationalID">National ID number</label>
                <input
                    name="nationalID"
                    defaultValue={nationalID}
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                />
            </div>

            <div className="flex justify-end items-center gap-6">
                <SubmitButton pendingLabel="Updating...">
                    Update profile
                </SubmitButton>
            </div>
        </form>
    );
}
