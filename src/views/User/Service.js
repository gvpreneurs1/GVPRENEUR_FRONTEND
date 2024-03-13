import React from 'react';
import { School as SchoolIcon, AssuredWorkload as AssuredWorkloadIcon, Paid as PaidIcon, AllInclusive as AllInclusiveIcon, RemoveModerator as RemoveModeratorIcon, CoPresent as CoPresentIcon} from '@mui/icons-material';

const ServicesSection = () => {
  return (
    <div id="services" className="section relative pt-20 pb-8 md:pt-16 md:pb-0 bg-white">
      <div className="container xl:max-w-6xl mx-auto px-4">
        {/* Heading start */}
        <header className="text-center mx-auto mb-12 lg:px-20">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-black">What We Do</h2>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 60"
            style={{ margin: '0 auto', height: '35px' }}
            xmlSpace="preserve"
          >
            <circle cx="50.1" cy="30.4" r="5" className="stroke-primary" style={{ fill: 'transparent', strokeWidth: 2, strokeMiterlimit: 10 }}></circle>
            <line x1="55.1" y1="30.4" x2="100" y2="30.4" className="stroke-primary" style={{ strokeWidth: 2, strokeMiterlimit: 10 }}></line>
            <line x1="45.1" y1="30.4" x2="0" y2="30.4" className="stroke-primary" style={{ strokeWidth: 2, strokeMiterlimit: 10 }}></line>
          </svg>
          <p className="text-gray-500 leading-relaxed font-light text-xl mx-auto pb-2">Training youth with business mindset in the digital landscape &amp; Expand the G.V. community</p>
        </header>
        {/* End heading */}
        {/* row */}
        <div className="flex flex-wrap flex-row -mx-4 text-center">
          {/* Service block 1 */}
          <div
            className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
            data-wow-duration="1s"
            style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}
          >
            <div className="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div className="inline-block text-gray-900 mb-4">
                {/* icon */}
              <SchoolIcon sx={{ fontSize: 40, }} color="primary"/>
              </div>
              <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Business Elevation</h3>
              <p className="text-gray-500">Our company provides business elevation through targeted digital training programs ensuring they stay competitive in today's digital landscape.</p>
            </div>
          </div>
          {/* Service block 2 */}
          <div
            className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".1s"
            style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.1s', animationName: 'fadeInUp' }}
          >
            <div className="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div className="inline-block text-gray-900 mb-4">
                {/* icon */}
                < AssuredWorkloadIcon sx={{ fontSize: 40, }} color="primary"/>
              </div>
              <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Government Authorized</h3>
              <p className="text-gray-500">To  symbolizes trust and compliance excellence, we help youths effortlessly attain and uphold this status through tailored guidance and training.</p>
            </div>
          </div>
          {/* Service block 3 */}
          <div
            className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".3s"
            style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.3s', animationName: 'fadeInUp' }}
          >
            <div className="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div className="inline-block text-gray-900 mb-4">
                {/* icon */}
              < PaidIcon sx={{ fontSize: 40, }} color="primary" />
              </div>
              <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Handsome bonus</h3>
              <p className="text-gray-500">Our company offers attractive bonuses for retailing our products, incentivizing sales representatives to excel.</p>
            </div>
          </div>

          <div
            className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".3s"
            style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.3s', animationName: 'fadeInUp' }}
          >
            <div className="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div className="inline-block text-gray-900 mb-4">
                {/* icon */}
              < AllInclusiveIcon sx={{ fontSize: 40, }} color="secondary" />
              </div>
              <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Permanent Member</h3>
              <p className="text-gray-500">Once you join, you're assured that your position within our organization is secure, and you won't face displacement or layoffs.</p>
            </div>
          </div>

          <div
            className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".3s"
            style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.3s', animationName: 'fadeInUp' }}
          >
            <div className="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div className="inline-block text-gray-900 mb-4">
                {/* icon */}
              < RemoveModeratorIcon sx={{ fontSize: 40, }} color="secondary" />
              </div>
              <h3 className="text-lg leading-normal mb-2 font-semibold text-black">No Demotion</h3>
              <p className="text-gray-500">We fosters a sense of security and confidence among our team members, enabling them to focus on growth and innovation without the fear of setbacks.</p>
            </div>
          </div>

          <div
            className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
            data-wow-duration="1s"
            data-wow-delay=".3s"
            style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.3s', animationName: 'fadeInUp' }}
          >
            <div className="py-8 px-12 mb-12 bg-gray-50 border-b border-gray-100 transform transition duration-300 ease-in-out hover:-translate-y-2">
              <div className="inline-block text-gray-900 mb-4">
                {/* icon */}
              < CoPresentIcon  sx={{ fontSize: 40, }} color="secondary" />
              </div>
              <h3 className="text-lg leading-normal mb-2 font-semibold text-black">Inheritable Business</h3>
              <p className="text-gray-500">Inheritable Business encapsulates the essence of continuity and legacy within our company as they can be easily transferred</p>
            </div>
          </div>
          
          {/* ... Add more service blocks as needed */}
        </div>
        {/* end row */}
      </div>
    </div>
  );
};

export default ServicesSection;