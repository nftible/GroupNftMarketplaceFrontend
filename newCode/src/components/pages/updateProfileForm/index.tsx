import React, { useEffect, useState, useRef } from "react";
import { useFormik } from 'formik';
import { API } from "aws-amplify";
import { usernameAvailable, getUserProfile } from "../../../graphql/queries";
import { updateProfile } from "../../../graphql/mutations";
import {validationSchema} from "./Validation";
import { getBase64, uuid } from "../../../utils/services";
import { useAppDispatch, RootStateType, useAppSelector } from "../../../redux/store";
import {updateCurrentAuthUser} from "../../../redux/slices/entitySlice"

export const UpdateProfileForm = () => {
  const dispatch = useAppDispatch();
  const {userData} = useAppSelector(state => state.entity)
  const [firstVal, setFirstVal] = useState<any>({});
  const [usernameAval, setUsernameAval] = useState(false);
  const [searchUsername, setSearchUsername] = useState(false);
  const [checkStart, setCheckStart] = useState(false);
  const [disabledButt, setDisabledButt] = useState(true);
  const [base64Cover, setBase64Cover] = useState(false);
  const [base64Profile, setBase64Profile] = useState(false);
  const [genCode, setGenCode] = useState("");
  const inputFileProfile = useRef<any>(null);
  const inputFileCover = useRef<any>(null);

  function shallowDiffReturn(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    let diff = {};
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        diff =  {[key]: object2[key], ...diff}
      }
    }
    return diff;
  }

  function shallowEqual(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

  const fetchDetails = async () => {
    try{
      const getProfile: any = await API.graphql({
        query: getUserProfile,
        variables: {input: {publicAddress: userData?.publicAddress}},
      })
      formik.setFieldValue("username", getProfile.data.getUserProfile.username);
      formik.setFieldValue("displayName", getProfile.data.getUserProfile.displayName)
      formik.setFieldValue("email", getProfile.data.getUserProfile.email)
      formik.setFieldValue("bio", getProfile.data.getUserProfile.bio)
      formik.setFieldValue("profileImage", getProfile.data.getUserProfile.profileImage)
      formik.setFieldValue("coverImage", getProfile.data.getUserProfile.coverImage)
      setFirstVal({
        username: getProfile.data.getUserProfile.username,
        displayName: getProfile.data.getUserProfile.displayName,
        email: getProfile.data.getUserProfile.email,
        bio: getProfile.data.getUserProfile.bio,
        profileImage: getProfile.data.getUserProfile.profileImage,
        coverImage: getProfile.data.getUserProfile.coverImage,
      });
    }
    catch(err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    setGenCode(uuid());
    fetchDetails();
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      displayName: '',
      email: '',
      bio: "",
      profileImage: "",
      coverImage: ""
    },
    validationSchema,
    onSubmit: async(values) => {
      setDisabledButt(true);
      const diff = shallowDiffReturn(firstVal, values);
      if(diff){
        try{
          const updateUser: any = await API.graphql({
            query: updateProfile,
            variables: {input: {...diff}},
          })
          await dispatch(updateCurrentAuthUser())
          formik.resetForm();        
          formik.setFieldValue("username", updateUser.data.updateProfile.username);
          formik.setFieldValue("displayName", updateUser.data.updateProfile.displayName);
          formik.setFieldValue("email", updateUser.data.updateProfile.email);
          formik.setFieldValue("bio", updateUser.data.updateProfile.bio);

          setBase64Cover(false);
          setBase64Profile(false);
          setGenCode(uuid());
          formik.setFieldValue("profileImage", updateUser.data.updateProfile.profileImage);
          formik.setFieldValue("coverImage", updateUser.data.updateProfile.coverImage);

          setSearchUsername(false);
          setCheckStart(false);
          setUsernameAval(false);
        }
        catch(err) {
          console.log("err ", err);
        }
      }
    },
  });

  const onChangeTextField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const allValues = formik.values;
    formik.setFieldValue(e.target.name, e.target.value);
    allValues[e.target.name] = e.target.value;
    if(shallowEqual(firstVal, allValues)){
      setDisabledButt(true);
    }
    else{
      setDisabledButt(false);
    }
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const allValues = formik.values;
    if(e.target.name === "coverImage" || e.target.name === "profileImage"){
      let img: any;
      if(e?.target && e?.target.files){
        img = await getBase64(e?.target?.files[0]);
        formik.setFieldValue(e.target.name, img);
        if(e.target.name === "coverImage"){
          setBase64Cover(true);
        }
        else{
          setBase64Profile(true);
        }
      }
      allValues[e.target.name] = img;
    }
    else{
      formik.setFieldValue(e.target.name, e.target.value);
      allValues[e.target.name] = e.target.value;
    }
    if(shallowEqual(firstVal, allValues)){
      setDisabledButt(true);
    }
    else{
      setDisabledButt(false);
    }
    if(firstVal?.username === e.target.value){
      setSearchUsername(false);
      setCheckStart(false);
      setUsernameAval(false);
    }
    if(e.target.name === "username" && firstVal?.username !== e.target.value){
      setCheckStart(true);
      setSearchUsername(true);
      try{
        const userfind: any = await API.graphql({
          query: usernameAvailable,
          variables: {username: e.target.value},
        })
        setUsernameAval(userfind.data.usernameAvailable);
        setSearchUsername(false);
      }
      catch(err) {
        setSearchUsername(false);
      }
    }
  }

  return (
    <div className="flex justify-center  mx-auto w-full px-4 mt-16">
      <div className="font-sans w-full space-y-10">
        <h1 className="font-sans font-semibold md:text-5xl text-3xl capitalize ">
          Edit your profile
        </h1>
        <div className="flex max-w-6xl 2xl:max-w-full justify-between">
          <div >
            <p className="font-semibold md:text-xl text-lg mb-6	">
              Upload a profile image.
            </p>
            {/* <p>Recommended size:</p>
            <p>1000x1000px.</p>
            <p>JPG, PNG, or GIF.</p>
            <p>10MB max size.</p> */}
              {
                formik.values.profileImage || base64Profile
                ?
                <img src={base64Profile ? formik.values.profileImage : `${process.env.s3_url}/${formik.values.profileImage}?${genCode}`} className="md:w-28 w-24 md:h-28 h-24 rounded-full bg-gray-200 cursor-pointer" onClick={() => inputFileProfile && inputFileProfile?.current.click()}/>
                :
                <div className="md:w-28 w-24 md:h-28 h-24 rounded-full bg-gray-200 cursor-pointer" onClick={() => inputFileProfile && inputFileProfile?.current.click()}></div>
              }
              <input 
                type="file"
                ref={inputFileProfile}
                accept="image/*"
                name="profileImage"
                style={{ display: "none" }}
                onChange={(e) => onChange(e)}
              />
          </div>
        </div>
        <div className="font-sans flex max-w-6xl 2xl:max-w-full justify-between">
          <div>
            <p className="font-semibold md:text-xl text-lg mb-6	">
              Upload a cover image.
            </p>
              {/* <p>Recommended size:</p>
              <p>1500x500px.</p>
              <p>JPG, PNG, or GIF.</p>
              <p>10MB max size.</p> */}
              {
                formik.values.coverImage || base64Cover
                ?
                <img src={base64Cover ? formik.values.coverImage : `${process.env.s3_url}/${formik.values.coverImage}?${genCode}`} className="md:w-40 w-24 md:h-28 h-24 rounded-2xl bg-gray-200 cursor-pointer" onClick={() => inputFileCover && inputFileCover?.current.click()}/>
                :
                <div className="md:w-40 w-24 md:h-28 h-24 rounded-2xl bg-gray-200 cursor-pointer" onClick={() => inputFileCover && inputFileCover?.current.click()}></div>
              }
            <input 
                type="file"
                ref={inputFileCover}
                accept="image/*"
                name="coverImage"
                style={{ display: "none" }}
                onChange={(e) => onChange(e)}
              />
          </div>
        </div>

        <form className="bg-white space-y-5  pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
          <div className="mb-4 md:max-w-xs">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="username"
            >
              Username
            </label>
            <input
              className={`shadow appearance-none border text-sm focus:border-transparent focus:ring-2 focus:ring-black rounded w-full py-2 px-3 text-gray-700 leading-loose focus:outline-none focus:shadow-outline ${(formik.errors.username || (!searchUsername && checkStart && !usernameAval)) && "border-red-500"}`}
              id="username"
              autoComplete="off"
              onChange={(e) => onChange(e)}
              value={formik.values.username}
              type="text"
              placeholder="Username"
              name="username"
            />
            <div className="mt-2 ml-2 flex">
              {searchUsername && <div style={{borderTopColor:"transparent", display: "inline-block"}} className="w-4 h-4 border-2 border-grey-400 border-solid rounded-full animate-spin"></div>}
              {!formik.errors.username && !searchUsername && checkStart &&
                (usernameAval
                ?
                  <p className="text-green-500 text-xs ml-2" style={{display: "inline-block"}}>
                    username "{formik.values.username}" is available.
                  </p>
                :
                  <p className="text-red-500 text-xs ml-2" style={{display: "inline-block"}}>
                    Username "{formik.values.username}" has already been taken.
                  </p>)

              }
            </div>
            <p className="text-red-500 text-xs ml-2" style={{display: "inline-block"}}>
              {formik.errors.username}
            </p>
          </div>
          <div className="mb-4 md:max-w-xs">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="displayName"
            >
              Display Name
            </label>
            <input
              className={`shadow appearance-none border focus:border-transparent  focus:ring-2 focus:ring-black text-sm rounded w-full py-2 px-3 text-gray-700 leading-loose focus:outline-none focus:shadow-outline ${formik.errors.displayName && "border-red-500"}`}
              id="DisplayName"
              type="text"
              name="displayName"
              onChange={(e) => onChange(e)}
              value={formik.values.displayName}
              placeholder="Display Name"
            />
            <p className="text-red-500 text-xs ml-2" style={{display: "inline-block"}}>
              {formik.errors.displayName}
            </p>
          </div>
          <div className="mb-4 md:max-w-xs">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="emailAddress"
            >
              Email Address
            </label>
            <input
              className={`shadow appearance-none border focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black ${formik.errors.email && "border-red-500"} text-sm rounded w-full py-2 px-3 text-gray-700 leading-loose focus:outline-none focus:shadow-outline`}
              id="emailAddress"
              type="email"
              name="email"
              onChange={(e) => onChange(e)}
              value={formik.values.email}
              placeholder="Email Address"
            />
            <p className="text-red-500 text-xs ml-2" style={{display: "inline-block"}}>
              {formik.errors.email}
            </p>
          </div>

          <div className="mb-4 md:max-w-xs">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              id="bio"
            >
              Add a short bio
            </label>
            <textarea
              className={`shadow appearance-none border focus:border-transparent focus:ring-2 focus:ring-black rounded w-full py-2 px-3 text-gray-700 text-sm leading-loose focus:outline-none focus:shadow-outline ${formik.errors.bio && "border-red-500"}`}
              id="bio"
              autoComplete="off"
              name="bio"
              onChange={(e) => onChangeTextField(e)}
              value={formik.values.bio}
              placeholder="Add a short bio"
              rows={5}
            ></textarea>
            <p className="text-red-500 text-xs ml-2" style={{display: "inline-block"}}>
              {formik.errors.bio}
            </p>
          </div>
          <div className="flex items-center justify-between mt-16">
              {
                !disabledButt
                ?
                  <button
                    className="text-white hover:bg-black bg-gray-900 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Save
                  </button>
                :
                  <button
                    className="text-white hover:bg-black bg-gray-900 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 cursor-auto"
                    disabled
                  >
                    Save
                  </button>
              }
            
          </div>
        </form>
      </div>
    </div>
  )
}