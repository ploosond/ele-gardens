import { FiPhoneCall } from "react-icons/fi";
import { FaFax } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
const Information = () => {
  return (
    <div>
      <div className="rounded-sm border bg-white p-4 shadow sm:p-6">
        <div className="space-y-3 py-2 text-gray-700">
          <p>
            <strong>Stauden Peters Plant Sales GmbH</strong> <br />
            Drüllerweg 14 <br />
            47559 Kranenburg <br />
            Germany
          </p>

          <p className="py-8">
            <FiPhoneCall className="inline" /> +49 (0)2826 / 91 50-0 <br />
            <FaFax className="inline" /> +49 (0)2826 / 91 50-50 <br />
            <MdMarkEmailRead className="inline" /> info@stauden-peters.de
          </p>

          <div className="mt-6 h-64 w-full">
            <iframe
              title="Stauden Peters Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2527.396522882413!2d6.011097616031929!3d51.7870463796741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c7797be64cb1d9%3A0x8d7154d55b3b34cb!2sDr%C3%BCllerweg%2014%2C%2047559%20Kranenburg%2C%20Germany!5e0!3m2!1sen!2sus!4v1637671833948!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
