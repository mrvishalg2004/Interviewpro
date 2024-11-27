import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-white" style={{ backgroundColor: '#f2f9f9' }}>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg?t=st=1732543954~exp=1732547554~hmac=fab496b81de67c098f4ef248643a623df8a76af0c7a93ae3a82313a144204df6&w=1060"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
</svg>



              </svg>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to InterviewPro...!! 
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
            𝒴𝑜𝓊𝓇 𝒜𝐼-𝓅𝑜𝓌𝑒𝓇𝑒𝒹 𝒾𝓃𝓉𝑒𝓇𝓋𝒾𝑒𝓌 𝓉𝓇𝒶𝒾𝓃𝒾𝓃𝑔 𝓅𝓁𝒶𝓉𝒻𝑜𝓇𝓂. 𝐿𝑒𝓉'𝓈 𝓊𝓃𝓁𝑜𝒸𝓀 𝓎𝑜𝓊𝓇 𝓅𝑜𝓉𝑒𝓃𝓉𝒾𝒶𝓁 𝒶𝓃𝒹 𝓅𝓇𝑒𝓅𝒶𝓇𝑒 𝓎𝑜𝓊 𝒻𝑜𝓇 𝓈𝓊𝒸𝒸𝑒𝓈𝓈!"
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                          </svg>

                </svg>
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to InterviewPro...!!

              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
              𝒴𝑜𝓊𝓇 𝒜𝐼-𝓅𝑜𝓌𝑒𝓇𝑒𝒹 𝒾𝓃𝓉𝑒𝓇𝓋𝒾𝑒𝓌 𝓉𝓇𝒶𝒾𝓃𝒾𝓃𝑔 𝓅𝓁𝒶𝓉𝒻𝑜𝓇𝓂. 𝐿𝑒𝓉'𝓈 𝓊𝓃𝓁𝑜𝒸𝓀 𝓎𝑜𝓊𝓇 𝓅𝑜𝓉𝑒𝓃𝓉𝒾𝒶𝓁 𝒶𝓃𝒹 𝓅𝓇𝑒𝓅𝒶𝓇𝑒 𝓎𝑜𝓊 𝒻𝑜𝓇 𝓈𝓊𝒸𝒸𝑒𝓈𝓈!"
              </p>
            </div>
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
