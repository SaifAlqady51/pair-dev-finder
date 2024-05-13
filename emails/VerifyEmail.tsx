import {
  Body,
  Container,
  Html,
  Section,
  Text,
  Tailwind,
  Head,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  code?: string;
}

export const VerifyEmail = ({ code }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] px-16 w-fit">
            <Section>
              <Text className="text-3xl font-semibold">Verify your email</Text>
              <Text className="bg-gray-100 text-xl py-4 px-1 tracking-widest text-center">
                {code}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerifyEmail;
