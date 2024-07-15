import React from 'react';

class DiaryDetailsCard extends React.Component {
  render() {
    const { diaryDetails } = this.props;

    return (
      <div className="card" style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div className="card-body">
          <div className="">
            <div className="">
              <strong>Duration:</strong> {diaryDetails.duration}
            </div>
            <div className="">
              <strong>Calories Burned:</strong> {diaryDetails.cal_burned}
            </div>
            <div className="">
              <strong>Calories Consumed:</strong> {diaryDetails.cal_consumed}
            </div>
            <div className="">
              <strong>Hours Slept:</strong> {diaryDetails.hours_slept}
            </div>
            <div className="">
              <strong>Water Intake:</strong> {diaryDetails.water_intake}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiaryDetailsCard;
