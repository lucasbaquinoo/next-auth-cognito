import Amplify from "aws-amplify";
import { Flex, Button, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import awsmobile from "../aws-exports";
import { Input } from "../components/Form/Input";
import { signIn } from "../services/api";

Amplify.configure({...awsmobile, ssr: true})

type SignInFormData = {
  email: string;
  password: string;
}

export default function Home() {
  const { register, handleSubmit, formState } = useForm()

  const handleSignIn: SubmitHandler<SignInFormData> = async ({ email, password }) => {
    const response = await signIn(email, password);
    console.log(response)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" {...register('email')} />
          <Input name="password" type="password" label="Senha" {...register('password')} />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}