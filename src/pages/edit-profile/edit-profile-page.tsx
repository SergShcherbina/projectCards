import { ToastContainer, toast } from 'react-toastify'

import { Spinner } from '../../assets'
import { EditProfile } from '../../components/ui/edit-profile'
import { useLogoutMutation, useMeQuery, useUpdateMeMutation } from '../../services/auth'

import 'react-toastify/dist/ReactToastify.css'

export const EditProfilePage = () => {
  const { data } = useMeQuery()
  const [updateMe, { isLoading }] = useUpdateMeMutation()
  const [onLogout] = useLogoutMutation()
  const formData = new FormData()

  const replaceAvatarHandler = (image: string | Blob) => {
    formData.append('avatar', image)

    updateMe(formData)
      .unwrap()
      .then(() => {
        toast.success('The changes were successful')
      })
      .catch(() => {
        toast.error('Some error for avatar update')
      })
  }

  const replaceNameHandler = (name: any) => {
    formData.append('name', name)

    updateMe(formData)
      .unwrap()
      .then(() => {
        toast.success('The changes were successful')
      })
      .catch(() => {
        toast.error('Some error for name update')
      })
  }

  if (!data || isLoading) return <Spinner />

  return (
    <div>
      <EditProfile
        name={data.name}
        src={data.avatar}
        email={data.email}
        logoutHandler={onLogout}
        replaceAvatar={replaceAvatarHandler}
        replaceName={replaceNameHandler}
      />
      <ToastContainer />
    </div>
  )
}
