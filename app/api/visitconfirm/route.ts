import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  chosenDate: string;
  //fullName: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, chosenDate } = context.requestPayload;
  const visitDate = new Date(chosenDate);
  // Confirm Email
  await context.run("visit-confirmed", async () => {
    console.log(`running in workflow route`);
    await sendEmail({
      email,
      subject: "Confirmation of visit to the kennel",
      message: `Thank you for scheduling a visit to meet the dogs! Please come on ${visitDate.toDateString()} from 10:00 AM to 17:00 PM and approach the staff for arrangements.`,
    });
  });
});
