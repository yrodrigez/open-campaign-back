import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
}
from '@react-email/components';

const loginLink = `https://ijzwizzfjawlixolcuia.supabase.co/storage/v1/object/public/users-profile-images/duckr-logo-removebg-preview.png`;
export const DuckrEmail = ({
                             name = "User!",
                             avatar = "",
                           } = {}) => {

  const previewText = `See what you missing out at Duckr!`;
  return (
    <Html>
      <Head/>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="bg-white border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[600px]">
            <Section className="mt-[32px]">
              <Img
                src={loginLink}
                width="60"
                height="60"
                alt="Duckr"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Check out what you're missing on Duckr!
            </Heading>
            <Section className="text-center">
              <Img
                src={avatar}
                width="80"
                height="80"
                alt="What you're missing out on"
                className="my-0 mx-auto border border-solid border-[#eaeaea] rounded-full"
              />
              <Text className="text-black text-[14px] leading-[24px] mt-[10px]">
                Look at what's happening on Duckr!
              </Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You've been missing out on lots of interesting conversations and updates from your friends
              on <strong>Duckr</strong>. Log in now and be part of the conversation!
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="font-bold px-[20px] py-[12px] bg-sky-500 rounded-full text-white no-underline text-center"
                href={'https://next-duckr.vercel.app/'}
              >
                Log in to Duckr
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"/>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any concerns regarding your account's safety, please reply to this email to get in touch with
              us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default DuckrEmail;
