// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import toast from "react-hot-toast";

// const SellerSignup = () => {
//   const router = useRouter();
//   const [seller, setSeller] = useState({
//     email: "",
//     password: "",
//     username: "",
//     shopName: "",
//     shopAddress: "",
//   });

//   const [buttonDisabled, setButtonDisabled] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const onSignup = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post("/api/users/ssignup", seller);
  
//       if (response.status === 200) {
//         console.log("Signup successful", response.data);
//         router.push("/login");
//       } else {
//         console.log(`Signup failed with status: ${response.status}`);
//         console.log("Response data:", response.data);
//       }
//     } catch (error: any) {
//       console.log("Signup failed", error.message);
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         toast.error(error.response.data.error || "An error occurred");
//       } else {
//         toast.error("An error occurred");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     if (seller.email && seller.password && seller.username && seller.shopName && seller.shopAddress) {
//       setButtonDisabled(false);
//     } else {
//       setButtonDisabled(true);
//     }
//   }, [seller]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="m-4">{loading ? "Processing" : "Seller Signup"}</h1>
//       <hr />
//       <label htmlFor="username">Username</label>
//       <input
//         className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
//         type="text"
//         id="username"
//         value={seller.username}
//         onChange={(e) => setSeller({ ...seller, username: e.target.value })}
//         placeholder="Username"
//       />
//       <label htmlFor="email">Email</label>
//       <input
//         className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
//         type="email"
//         id="email"
//         value={seller.email}
//         onChange={(e) => setSeller({ ...seller, email: e.target.value })}
//         placeholder="Email"
//       />
//       <label htmlFor="password">Password</label>
//       <input
//         className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
//         type="password"
//         id="password"
//         value={seller.password}
//         onChange={(e) => setSeller({ ...seller, password: e.target.value })}
//         placeholder="Password"
//       />
//       <label htmlFor="shopName">Shop Name</label>
//       <input
//         className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
//         type="text"
//         id="shopName"
//         value={seller.shopName}
//         onChange={(e) => setSeller({ ...seller, shopName: e.target.value })}
//         placeholder="Shop Name"
//       />
//       <label htmlFor="shopAddress">Shop Address</label>
//       <input
//         className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600 text-black"
//         type="text"
//         id="shopAddress"
//         value={seller.shopAddress}
//         onChange={(e) => setSeller({ ...seller, shopAddress: e.target.value })}
//         placeholder="Shop Address"
//       />
//       <button
//         className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-600"
//         onClick={onSignup}
//         disabled={buttonDisabled}
//       >
//         {buttonDisabled ? "No Signup" : "Signup"}
//       </button>
//       <Link href="/login"> Visit Login Page</Link>
//     </div>
//   );
// };

// export default SellerSignup;

"use client";
import Link from "next/link";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

const SellerSignup = () => {
  const router = useRouter();
  const [seller, setSeller] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    businessRegNumber: "",
    taxIdNumber: "",
    regionOfOperation: "",
    bankAccountDetails: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
    businessLicenseNumber: "",
    pinCode: "",
    passportPhoto: null as File | null,
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSeller({ ...seller, passportPhoto: file });
  };

  const prepareFormData = () => {
    const formData = new FormData();
    Object.entries(seller).forEach(([key, value]) => {
      if (key === "bankAccountDetails") {
        Object.entries(value).forEach(([detailKey, detailValue]) => {
          formData.append(`bankAccountDetails[${detailKey}]`, detailValue);
        });
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      const formData = prepareFormData();
      const response = await axios.post("/api/users/seller-signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        console.log("Signup successful", response.data);
        router.push("/login");
      } else {
        console.log(`Signup failed with status: ${response.status}`);
        console.log("Response data:", response.data);
      }
    } catch (error: any) {
      console.log("Signup failed", error.message);
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(seller).every((value) => {
      if (typeof value === "object" && value !== null) {
        return Object.values(value).every((v) => v !== "");
      }
      return value !== "" && value !== null;
    });
    setButtonDisabled(!allFieldsFilled);
  }, [seller]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="m-4">{loading ? "Processing" : "Seller Signup"}</h1>
      <hr />

      <label htmlFor="username">Username</label>
      <Input
        type="text"
        id="username"
        value={seller.username}
        onChange={(e) => setSeller({ ...seller, username: e.target.value })}
        placeholder="Username"
      />

      <label htmlFor="email">Email</label>
      <Input
        type="email"
        id="email"
        value={seller.email}
        onChange={(e) => setSeller({ ...seller, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <Input
        type="password"
        id="password"
        value={seller.password}
        onChange={(e) => setSeller({ ...seller, password: e.target.value })}
        placeholder="Password"
      />

      <label htmlFor="contactNumber">Contact Number</label>
      <Input
        type="tel"
        id="contactNumber"
        value={seller.contactNumber}
        onChange={(e) => setSeller({ ...seller, contactNumber: e.target.value })}
        placeholder="Contact Number"
      />

      <label htmlFor="businessRegNumber">Business Registration Number</label>
      <Input
        type="text"
        id="businessRegNumber"
        value={seller.businessRegNumber}
        onChange={(e) => setSeller({ ...seller, businessRegNumber: e.target.value })}
        placeholder="Business Registration Number"
      />

      <label htmlFor="taxIdNumber">Tax Identification Number (TIN)</label>
      <Input
        type="text"
        id="taxIdNumber"
        value={seller.taxIdNumber}
        onChange={(e) => setSeller({ ...seller, taxIdNumber: e.target.value })}
        placeholder="Tax Identification Number (TIN)"
      />

      <label htmlFor="regionOfOperation">Region of Operation</label>
      <Input
        type="text"
        id="regionOfOperation"
        value={seller.regionOfOperation}
        onChange={(e) => setSeller({ ...seller, regionOfOperation: e.target.value })}
        placeholder="Region of Operation"
      />

      <label htmlFor="bankAccountDetails">Bank Account Details</label>
      <Input
        type="text"
        id="accountNumber"
        value={seller.bankAccountDetails.accountNumber}
        onChange={(e) => setSeller({ ...seller, bankAccountDetails: { ...seller.bankAccountDetails, accountNumber: e.target.value } })}
        placeholder="Account Number"
      />
      <Input
        type="text"
        id="bankName"
        value={seller.bankAccountDetails.bankName}
        onChange={(e) => setSeller({ ...seller, bankAccountDetails: { ...seller.bankAccountDetails, bankName: e.target.value } })}
        placeholder="Bank Name"
      />
      <Input
        type="text"
        id="ifscCode"
        value={seller.bankAccountDetails.ifscCode}
        onChange={(e) => setSeller({ ...seller, bankAccountDetails: { ...seller.bankAccountDetails, ifscCode: e.target.value } })}
        placeholder="IFSC Code"
      />

      <label htmlFor="businessLicenseNumber">Business License Number</label>
      <Input
        type="text"
        id="businessLicenseNumber"
        value={seller.businessLicenseNumber}
        onChange={(e) => setSeller({ ...seller, businessLicenseNumber: e.target.value })}
        placeholder="Business License Number"
      />

      <label htmlFor="pinCode">Pin Code</label>
      <Input
        type="text"
        id="pinCode"
        value={seller.pinCode}
        onChange={(e) => setSeller({ ...seller, pinCode: e.target.value })}
        placeholder="Pin Code"
      />

      <label htmlFor="passportPhoto">Passport-sized Photo</label>
      <input
        type="file"
        id="passportPhoto"
        accept="image/*"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={onSignup}
        disabled={buttonDisabled || loading}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default SellerSignup;
