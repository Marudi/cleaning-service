import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import JobApplicationModal from './careers/JobApplicationModal';

const jobOpenings = [
  {
    id: '1',
    title: 'Senior Cleaning Specialist',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Lead cleaning specialist with 3+ years of experience in commercial cleaning.',
    requirements: [
      'Previous experience in commercial cleaning',
      'Strong attention to detail',
      'Team leadership skills',
      'Flexible schedule availability'
    ]
  },
  {
    id: '2',
    title: 'Residential Cleaning Team Lead',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    description: 'Experienced team lead to manage residential cleaning operations.',
    requirements: [
      'Proven experience in residential cleaning',
      'Valid driver\'s license',
      'Customer service skills',
      'Team management experience'
    ]
  },
  {
    id: '3',
    title: 'Part-Time Cleaner',
    location: 'Chicago, IL',
    type: 'Part-time',
    description: 'Flexible part-time position for residential and commercial cleaning.',
    requirements: [
      'No prior experience required',
      'Reliable transportation',
      'Strong work ethic',
      'Weekend availability'
    ]
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<typeof jobOpenings[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="careers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Be part of a growing company that values quality, integrity, and customer satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {jobOpenings.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Immediate Start</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{job.description}</p>
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Don't see the right fit?</h3>
          <p className="text-gray-600 mb-6">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file.
          </p>
          <button
            onClick={() => {
              setSelectedJob(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit General Application
          </button>
        </div>
      </div>

      {isModalOpen && (
        <JobApplicationModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}