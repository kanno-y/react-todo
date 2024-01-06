/**
 * エラーメッセージをハンドリングするカスタムフック
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store'
import { CsrfToken } from '../types'
import axios from 'axios'

export const useError = () => {
  const navigate = useNavigate()
  const resetEditedtask = useStore((state) => state.resetEditedTask)
  const getCsrfToken = async () => {
    const { data } = await axios.get<CsrfToken>(
      `${process.env.REACT_APP_API_URL}/csrf`
    )
    axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf_token
  }

  const switchErrorHandling = (msg: string) => {
    switch (msg) {
      case 'invalid csrf token':
        getCsrfToken()
        alert('CSRF token is InvalidatedProjectKind, please try agein')
        break
      case 'invalid or expired jwt':
        alert(`access token expired, please login`)
        resetEditedtask()
        navigate('/')
        break
      case 'missingu or malformed jwt':
        alert(`access token is not valid, please login`)
        resetEditedtask()
        navigate('/')
        break
      case 'duplicated key not allowed':
        alert(`email alreay exist, please use another one`)
        break
      case 'crypto/bcript: hashedPassword is not the hash of the given password':
        alert(`password is not correct`)
        break
      case 'record not found':
        alert(`email is not correeect`)
        break
      default:
        alert(msg)
    }
  }
  return { switchErrorHandling }
}
