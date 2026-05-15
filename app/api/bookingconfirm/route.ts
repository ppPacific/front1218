import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  slug: string;
  //fullName: string;
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, slug } = context.requestPayload;
  //const visitDate = new Date(chosenDate);
  // Confirm Email
  await context.run("booking-confirmed", async () => {
    await sendEmail({
      email,
      subject: "Your booking is confirmed. Dog Rescue - Bring Love Home",
      message: `Thank you for booking ${slug}! <br/> <br/>
We are happy that you are interested in joining this event. Please attend the event accordingly. <br/><br/>
For further enquiries, please contact below support email for help. Thank you so much!<br/><br/>
Dog Rescue - Bring Love Home <br/>
contact@dogslifelove.dog`,
    });
  });
});
