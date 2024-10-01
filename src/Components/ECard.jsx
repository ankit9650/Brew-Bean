import React from 'react';

function ECard({ image, title, description }) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="flex justify-center">
                <img
                    src={image}
                    alt={title} // Use title for alt attribute for better accessibility
                    className="object-cover" // Optional: To maintain image aspect ratio
                />
            </figure>
            <div className="card-body text-center"> {/* Center text inside card body */}
                <h2 className="card-title justify-center ">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-center space-x-3">
                    <button className="btn btn-info">Buy Now</button>
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ECard;