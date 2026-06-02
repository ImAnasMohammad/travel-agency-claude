/*
 *  FileName:-     useUser.js
 *  Description:-  Custom hook for user profile data and update operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useSelector, useDispatch } from 'react-redux';
import { selectProfile, selectIsUpdating, setProfile } from '../slices/userSlice';
import { useGetProfileQuery, useUpdateProfileMutation, useUpdateAvatarMutation } from '../apis/userApi';
import { updateUser } from '../../auths/slices/authSlice';
import toast from 'react-hot-toast';

const useUser = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const isUpdating = useSelector(selectIsUpdating);

  const { data: profileData, isLoading, refetch } = useGetProfileQuery(undefined, {
    skip: false,
  });

  const [updateProfileMutation, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [updateAvatarMutation, { isLoading: isUploadingAvatar }] = useUpdateAvatarMutation();

  const currentProfile = profileData?.data || profile;

  const updateProfile = async (data) => {
    try {
      const result = await updateProfileMutation(data).unwrap();
      dispatch(setProfile(result.data));
      dispatch(updateUser(result.data));
      toast.success('Profile updated successfully!');
      return result;
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update profile.');
      throw error;
    }
  };

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const result = await updateAvatarMutation(formData).unwrap();
      dispatch(updateUser({ avatar: result.data?.avatar }));
      refetch();
      toast.success('Profile picture updated!');
      return result;
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to upload avatar.');
      throw error;
    }
  };

  const getLoyaltyTier = (points) => {
    if (points >= 10000) return { name: 'Platinum', color: '#B8B8B8', next: null };
    if (points >= 5000) return { name: 'Gold', color: '#FFD166', next: { name: 'Platinum', remaining: 10000 - points } };
    if (points >= 1000) return { name: 'Silver', color: '#9CA3AF', next: { name: 'Gold', remaining: 5000 - points } };
    return { name: 'Bronze', color: '#FF6B35', next: { name: 'Silver', remaining: 1000 - points } };
  };

  return {
    profile: currentProfile,
    isLoading,
    isUpdating: isUpdatingProfile || isUpdating,
    isUploadingAvatar,
    updateProfile,
    uploadAvatar,
    refetch,
    getLoyaltyTier,
  };
};

export default useUser;
