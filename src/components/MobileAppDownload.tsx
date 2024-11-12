import React from 'react';
import { QrCode, Smartphone, Star } from 'lucide-react';

export default function MobileAppDownload() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Our Mobile Apps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download our mobile apps for a seamless cleaning experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Customer App */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer App</h3>
                <div className="flex items-center text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-2 text-gray-600">(1,234 reviews)</span>
                </div>
              </div>
              <Smartphone className="h-12 w-12 text-blue-600" />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <p className="ml-4 text-gray-600">Book services instantly</p>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <p className="ml-4 text-gray-600">Track cleaner location</p>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <p className="ml-4 text-gray-600">Rate and review services</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">Scan to download</div>
                <div className="text-sm text-gray-500">Available on iOS and Android</div>
              </div>
              <QrCode className="h-24 w-24 text-gray-900" />
            </div>
          </div>

          {/* Cleaner App */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Cleaner App</h3>
                <div className="flex items-center text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-2 text-gray-600">(856 reviews)</span>
                </div>
              </div>
              <Smartphone className="h-12 w-12 text-green-600" />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">1</span>
                </div>
                <p className="ml-4 text-gray-600">Manage your schedule</p>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">2</span>
                </div>
                <p className="ml-4 text-gray-600">Navigate to jobs easily</p>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">3</span>
                </div>
                <p className="ml-4 text-gray-600">Track your earnings</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 mb-1">Scan to download</div>
                <div className="text-sm text-gray-500">Available on iOS and Android</div>
              </div>
              <QrCode className="h-24 w-24 text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}