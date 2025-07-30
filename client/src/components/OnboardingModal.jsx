import React from 'react';
import partyIcon from '../assets/icons/party.svg';

const OnboardingModal = ({ onClose, onChooseTemplate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">
            <img src={partyIcon} alt="" width="40" height="40" className="mx-auto" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Welcome to StaticSiteCraft!</h3>
          <p className="text-gray-600">
            Let's create your first website. Choose a template to get started.
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Choose a Template</h4>
              <p className="text-sm text-gray-600">Select from our professionally designed templates</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Customize Your Content</h4>
              <p className="text-sm text-gray-600">Edit text, colors, and layout to match your brand</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Download & Deploy</h4>
              <p className="text-sm text-gray-600">Download your website and upload it anywhere</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onChooseTemplate}
            className="btn-primary flex-1"
          >
            Choose Template
          </button>
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Skip Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal; 