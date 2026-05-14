import { serve } from "@upstash/workflow";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  chosenDate: Date;
  //fullName: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, chosenDate } = context.requestPayload;

  // Confirm Email
  await context.run("visit-confirmed", async () => {
    console.log(`running in workflow route`);
    await sendEmail({
      email,
      subject: "Confirmation of visit to the kennel",
      message: `Thank you for scheduling a visit to meet the dogs! Please come on ${chosenDate} from 10:00 AM to 17:00 PM and ask the staff for arrangements.`,
    });
  });
});
