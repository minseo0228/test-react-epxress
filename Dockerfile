# React 애플리케이션 이미지를 기반으로 시작
FROM your-react-image-name as react-app

# Express 애플리케이션 이미지를 기반으로 시작
FROM your-express-image-name as express-app

# Nginx를 사용하여 React 애플리케이션과 Express 애플리케이션을 결합하는 단계
FROM nginx:alpine

# React 애플리케이션 빌드 결과물을 Nginx 서버의 정적 파일 디렉토리에 복사
COPY --from=react-app /usr/share/nginx/html /usr/share/nginx/html

# Express 애플리케이션을 Nginx 서버의 API 엔드포인트로 설정
# (Express 애플리케이션은 "your-express-api-endpoint"를 실제 API 엔드포인트로 변경해야 합니다.)
RUN echo "location /api { proxy_pass http://your-express-api-endpoint; }" > /etc/nginx/conf.d/default.conf

# Nginx 서버 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
