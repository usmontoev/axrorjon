const LONG_RAYS  = 8;
const SHORT_RAYS = 8;

const longAngles  = Array.from({ length: LONG_RAYS },  (_, i) => i * (360 / LONG_RAYS));
const shortAngles = Array.from({ length: SHORT_RAYS }, (_, i) => i * (360 / SHORT_RAYS) + 22.5);

export default function SunDecor() {
  return (
    <>
      <div className="sun__ambient" />

      <div className="sun__wrap">
        {/* 3D tilt layer */}
        <div className="sun__tilt">
          {/* slow spin layer */}
          <div className="sun__spin">
            <svg
              className="sun__svg"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="sg-core" cx="50%" cy="42%" r="55%">
                  <stop offset="0%"   stopColor="#FFFFFF" />
                  <stop offset="22%"  stopColor="#FFFBE0" />
                  <stop offset="55%"  stopColor="#FFD93D" />
                  <stop offset="82%"  stopColor="#FF9F1C" />
                  <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.85" />
                </radialGradient>

                <radialGradient id="sg-corona" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#FFD93D" stopOpacity="0.32" />
                  <stop offset="55%"  stopColor="#FF9F1C" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="sg-ray-long" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%"   stopColor="#FFD93D" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FFBA08" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="sg-ray-short" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%"   stopColor="#FFD93D" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#FFD93D" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* outer corona */}
              <circle
                className="sun__corona"
                cx="100" cy="100" r="86"
                fill="url(#sg-corona)"
              />

              {/* long rays */}
              {longAngles.map((angle, i) => (
                <polygon
                  key={`l${i}`}
                  className="sun__ray sun__ray--long"
                  style={{ animationDelay: `${i * 0.22}s` }}
                  points="97,62 103,62 101.2,10 98.8,10"
                  fill="url(#sg-ray-long)"
                  transform={`rotate(${angle} 100 100)`}
                />
              ))}

              {/* short rays */}
              {shortAngles.map((angle, i) => (
                <polygon
                  key={`s${i}`}
                  className="sun__ray sun__ray--short"
                  style={{ animationDelay: `${i * 0.18 + 0.11}s` }}
                  points="98.5,62 101.5,62 100.8,30 99.2,30"
                  fill="url(#sg-ray-short)"
                  transform={`rotate(${angle} 100 100)`}
                />
              ))}

              {/* mid ring */}
              <circle
                className="sun__ring"
                cx="100" cy="100" r="50"
                fill="none"
                stroke="rgba(255,217,61,0.25)"
                strokeWidth="1"
              />

              {/* core disc */}
              <circle
                className="sun__core"
                cx="100" cy="100" r="38"
                fill="url(#sg-core)"
              />

              {/* bright center */}
              <circle
                className="sun__bright"
                cx="100" cy="100" r="18"
                fill="#FFFFFF"
              />

              {/* specular flare */}
              <ellipse
                className="sun__flare"
                cx="91" cy="91" rx="6" ry="4"
                fill="rgba(255,255,255,0.55)"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
