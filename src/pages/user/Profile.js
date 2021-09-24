export default function Profile({ user }) {
    return (
        <div className="container pt-48">
            <div className="font-sans w-full flex flex-row justify-center items-center">
                <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow rounded-lg">
                    <img className="w-48 h-48 bg-gray-200 mx-auto rounded-full -mt-20 border-8 border-white object-cover" src={user.image} alt="" />
                    <div className="text-center mt-2 text-3xl font-medium">{user.fullName}</div>
                    <div className="text-center mt-2 font-light text-sm">{user.email}</div>
                    {/* <div className="text-center font-normal text-lg"></div> */}
                    <div className="px-6 text-center my-2 font-light text-sm">
                        <p>{user.address}</p>
                    </div>
                    {/* <hr className="mt-8" />
                    <div className="flex p-4">
                        <div className="w-1/2 text-center">
                            <span className="font-bold">1.8 k</span> Followers
                        </div>
                        <div className="w-0 border border-gray-300"></div>
                        <div className="w-1/2 text-center">
                            <span className="font-bold">2.0 k</span> Following
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
