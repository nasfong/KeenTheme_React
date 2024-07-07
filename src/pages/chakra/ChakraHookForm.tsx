import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  age: number
  dob: string
}

const ChakraHookForm = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>()

  const OnSubmit = (input: FormData) => {
    console.log(input)
  }
  return (
    <VStack as='form' onSubmit={handleSubmit(OnSubmit)}>

      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First Name is required' }}
        render={({ field, fieldState }) => (
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input {...field} autoComplete="current-password" />
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
          </FormControl>
        )}
      />

      {/* <FormControl isInvalid={!!errors.firstName}>
        <FormLabel>First Name</FormLabel>
        <Input {...register('firstName', { required: 'First Name is required' })} />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl> */}

      <FormControl isInvalid={!!errors.lastName}>
        <FormLabel>Last Name</FormLabel>
        <Input {...register('lastName', { required: 'Last Name is required' })} />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      {/* <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input {...register('password', { required: 'Password is required' })} type="password" />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl> */}

      <FormControl isInvalid={!!errors.age}>
        <FormLabel>Age</FormLabel>
        <Input {...register('age', { required: 'Age is required' })} type="number" />
        <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.dob}>
        <FormLabel>Date of Birth</FormLabel>
        <Input {...register('dob', { required: 'Date of Birth is required' })} type="date" />
        <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
      </FormControl>

      <Button type='submit'>Submit</Button>
    </VStack>
  )
}

export default ChakraHookForm