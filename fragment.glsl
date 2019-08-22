precision mediump float;

varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
uniform vec3 uLightPosition;
uniform vec3 uViewPosition;

void main() {
    float ambientStrength = 0.1;
    float specularStrength = 0.5;
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 ambient = ambientStrength * lightColor;
    
    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(uLightPosition - vPosition);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    vec3 viewDir = normalize(uViewPosition - vPosition);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * lightColor;  

    vec3 result = (ambient + diffuse + specular) * vColor;

    gl_FragColor = vec4(result, 1.0);
}