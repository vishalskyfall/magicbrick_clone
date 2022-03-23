import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {doc, updateDoc} from 'firebase/firestore'
import { db } from "../firebase.config";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {
  const auth = getAuth();
  const [formData, setFormData] =useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
 

  const { name, email } = formData
  const navigate = useNavigate()


const onLogout = ()=>{
  auth.signOut()
  navigate('/')
}
const onChange = (e)=>{
setFormData((prev)=>({
  ...prev,
  [e.target.id] : e.target.value
}))
}
const onDelete = ()=>{}
const onSubmit = async()=>{
try {
  if(auth.currentUser.displayName!==name){
    await updateProfile(auth.currentUser, {
  displayName:name
})
const userRef = doc(db,'users',auth.currentUser.uid)
await updateDoc(userRef,{
  name:name
})

}
} catch (error) {
  toast.error('Could not update profile details')
}

}
const onEdit = ()=>{}

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

       <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>

        {/* {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )} */}
      </main> 
    </div>
  )
}

export default Profile;
