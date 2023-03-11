// export const ContentLayout = ({ children }: any) => {
//   return (
//     <main className="flex bg-gray-100 h-screen">
//       <div className="py-6">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
//           {/* Replace with your content */}
//           <div className="py-4 md:ml-60">
//             <div className="text-2xl font-semibold text-gray-900">{children}</div>
//           </div>
//           {/* /End replace */}
//         </div>
//       </div>
//     </main>
//   );
// };

export const ContentLayout = ({ children }: any) => {
  return (
    <main className="flex bg-gray-100 h-full">
      <div className="py-6 w-full">
        {/* max-w-7xl 
        <div className="ml-4 mr-2 mx-auto px-4 sm:px-6 md:px-8"> */}
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4 md:ml-60">
            <div className="text-2xl font-semibold text-gray-900">{children}</div>
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
};  
