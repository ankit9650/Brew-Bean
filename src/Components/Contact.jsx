import React from 'react'

function Contact() {
  return (
    <>
      <div class="font-[sans-serif] max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]  bg-transparent rounded-3xl overflow-hidden mt-4">
      <div class="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-mainhead-button"></div>
      <div class="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-mainhead-button"></div>

      <div class="grid md:grid-cols-2 gap-8 py-8 px-6">
        <div class="text-center flex flex-col items-center justify-center">
          <img src="src\assets\contact.png" class="shrink-0 w-5/6" />
        </div>

        <form class="rounded-tl-3xl rounded-bl-3xl">
          <h2 class="text-2xl text-mainhead-heading font-bold text-center mb-6">Contact us</h2>
          <div class="max-w-md mx-auto space-y-3 relative">
            <input type='text' placeholder='Name'
              class="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
            <input type='email' placeholder='Email'
              class="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
            <input type='email' placeholder='Phone No.'
              class="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-blue-600 focus-within:bg-transparent" />
            <textarea placeholder='Message' rows="6"
              class="w-full bg-gray-100 rounded-md px-4 text-sm pt-3 outline-blue-600 focus-within:bg-transparent"></textarea>

<button className="sm:w-[200px] w-full group px-3.5 py-2 bg-body hover:bg-mainhead-heading rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex mx-auto">
  <span className="px-1.5 text-mainhead-heading group-hover:text-body text-sm font-semibold leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
    Submit
  </span>                
</button>


          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Contact